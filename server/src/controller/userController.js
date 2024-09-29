const User = require("../schema/userSchema");
const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rajveershekhar.singh@gmail.com",
    pass: "qkbldjatxrfwdpwu",
  },
});

// exports.signup = async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const referredBy = req.body.referredBy || null;

//     let user = await User.findOne({ email });
//     if (user) return res.status(200).json({ message: "exist" });
//     let password = req.body.password;
//     password = await bcrypt.hash(password, 12);
//     const verificationToken = crypto.randomBytes(32).toString("hex");

//     user = new User({ name, email, password, verificationToken, referredBy });

//     const newUser =  await user.save();

//     await User.findByIdAndUpdate(
//       referredBy,
//       { $push: { referrals: newUser._id } },
//       { new: true }
//     );

//     const verificationLink = `${process.env.VERIFY_URL}${verificationToken}`;
//     await transporter.sendMail({
//       to: email,
//       subject: "Verify your email",
//       html: `Click <a href="${verificationLink}">here</a> to verify your email.`,
//     });

//     res.status(200).json({ message: "success" });
//   } catch (err) {
//     res.status(500).json({ message: `Server error: ${err}` });
//     console.log("Error: ", err);
//   }
// };

exports.signup = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session for the transaction
  session.startTransaction(); // Begin the transaction

  try {
    const { name, email } = req.body;
    let password = req.body.password;

    const referredBy = req.body.referredBy || null;

    let user = await User.findOne({ email });
    if (user) {
      await session.abortTransaction(); // Abort the transaction if user already exists
      session.endSession();
      return res.status(200).json({ message: "exist" });
    }

    // Hash the password and create the verification token
    password = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create new user
    user = new User({ name, email, password, verificationToken, referredBy });
    const newUser = await user.save({ session }); // Save the user within the session

    // Update the referredBy user, pushing newUser._id into the referrals array
    if (referredBy) {
      await User.findByIdAndUpdate(
        referredBy,
        { $push: { referrals: newUser._id } },
        { new: true, session } // Use the same session for this operation
      );
    }

    // Commit the transaction after both operations succeed
    await session.commitTransaction();
    session.endSession(); // End the session

    // Send verification email
    const verificationLink = `${process.env.VERIFY_URL}${verificationToken}`;
    await transporter.sendMail({
      to: email,
      subject: "Verify your email",
      html: `Click <a href="${verificationLink}">here</a> to verify your email.`,
    });

    res.status(200).json({ message: "success" });
  } catch (err) {
    // If anything fails, abort the transaction and roll back changes
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: `Server error: ${err}` });
    console.log("Error: ", err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(200).json({ message: "Invalid credentials" });
    if (!user.isVerified)
      return res.status(200).json({ message: "Email not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(200).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "success", token: token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.isExist = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(200).json({ message: false });
    }

    const userExists = await User.findById(userId).exec();

    if (userExists) {
      if (userExists.investmentAmount >= 10000000) {
        res.status(200).json({ message: true });
      } else {
        res.status(200).json({ message: false });
      }
    } else {
      res.status(200).json({ message: false });
    }
  } catch (err) {
    console.error("Error checking user existence:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });

    if (!user) return res.status(200).json({ message: false });

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: true });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    //console.log("userid: ", userId);
    //const user = await User.findById(userId).select('-password -verificationToken');

    const user = await User.findById(userId)
      .select("-password -verificationToken -isVerified")
      .populate({
        path: "referrals",
        select: "name email investmentAmount -_id",
      });

    if (!user) return res.status(200).json({ message: "User not found" });

    //console.log(user, "ghjkl");

    res.status(200).json({
      message: "success",

      // data: {
      //   id: user._id,
      //   name: user.name,
      //   email: user.email,
      // }

      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserReferrals = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select(
      "-password -verificationToken"
    );

    if (!user) return res.status(200).json({ message: "User not found" });

    const referrals = user.referrals;

    let referralData = [];

    for (let referral of referrals) {
      const user = await User.findById(referral).select(
        "name, email, investmentAmount"
      );
      referralData.push(user);
    }

    res.status(200).json({ message: "success", data: referralData });
  } catch (error) {
    res.status(200).json({ message: "failure", error: error });
  }
};

exports.fetchUserByEmail = async (req, res) => {
  try {
    const adminId = req.user.id;
    //console.log("fetchuser started", adminId);
    const adminData = await User.findById(adminId);
    if (!adminData || adminData.role !== "admin") {
      return res.status(200).json({ message: "Invalid access" });
    }
    const userEmail = req.params.email;
    const userData = await User.findOne({ email: userEmail })
      .select("-password -verificationToken")
      .populate({
        path: "referredBy",
        select: "name email -_id",
      });
    if (userData) {
      res.status(200).json({ message: "success", data: userData });
    } else {
      res.status(200).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(200).json({ message: "failure", error });
  }
};
exports.fetchUserById = async (req, res) => {
  try {
    // const adminId = req.user.id;
    // console.log("fetchuser started", adminId);
    // const adminData = await User.findById(adminId);
    // if (!adminData || adminData.role !== "admin") {
    //   return res.status(200).json({ message: "Invalid access" });
    // }
    const userId = req.params.id;
    const userData = await User.findById(userId)
      .select("-password -verificationToken")
      .populate({
        path: "referredBy",
        select: "name email -_id",
      });
    if (userData) {
      res.status(200).json({ message: "success", data: userData });
    } else {
      res.status(200).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(200).json({ message: "failure", error });
  }
};

exports.getTotalInvestment = async (req, res) => {
  try {
    const totalInvestment = await User.aggregate([
      {
        $group: {
          _id: null, // Group all documents together
          totalInvestment: { $sum: "$investmentAmount" }, // Sum the investment field
        },
      },
    ]);

    // If no users found or no investments
    if (!totalInvestment || totalInvestment.length === 0) {
      return res
        .status(200)
        .json({ totalInvestment: 0, message: "No investments found" });
    }

    // Send the total investment in the response
    return res.status(200).json({
      message: "success",
      data: totalInvestment[0].totalInvestment,
    });
  } catch (error) {
    console.error("Error fetching total investment:", error);
    return res.status(200).json({ message: "Server error", error });
  }
};

exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      message: "success",
      totalUsers: totalUsers - 1,
    });
  } catch (error) {
    console.error("Error fetching total users:", error);
    return res.status(200).json({ message: "Server error", error });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    // Use Promise.all to run all queries simultaneously
    const [totalEarningsAndInvestment, totalUsers] = await Promise.all([
      // Aggregation to calculate total investment, referralEarning, and investmentEarning
      User.aggregate([
        {
          $group: {
            _id: null, // Group all documents together
            totalInvestment: { $sum: "$investmentAmount" }, // Sum the investmentAmount field
            totalReferralEarning: { $sum: "$referralEarning" }, // Sum the referralEarning field
            totalInvestmentEarning: { $sum: "$investmentEarning" }, // Sum the investmentEarning field
          },
        },
      ]),
      // Count total number of users
      User.countDocuments(),
    ]);

    // If no users or no data found
    const totalInvestmentAmount =
      totalEarningsAndInvestment.length > 0
        ? totalEarningsAndInvestment[0].totalInvestment
        : 0;
    const totalReferralEarning =
      totalEarningsAndInvestment.length > 0
        ? totalEarningsAndInvestment[0].totalReferralEarning
        : 0;
    const totalInvestmentEarning =
      totalEarningsAndInvestment.length > 0
        ? totalEarningsAndInvestment[0].totalInvestmentEarning
        : 0;

    return res.status(200).json({
      message: "success",
      data: {
        totalInvestment: totalInvestmentAmount,
        totalReferralEarning: totalReferralEarning,
        totalInvestmentEarning: totalInvestmentEarning,
        totalUsers: totalUsers - 1,
      },
    });
  } catch (error) {
    console.error(
      "Error fetching total investment, earnings, and users:",
      error
    );
    return res.status(200).json({ message: "Server error", error });
  }
};
