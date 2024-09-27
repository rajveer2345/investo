const Transaction = require("../schema/transactionSchema");
const User = require("../schema/userSchema");
const mongoose = require("mongoose");



exports.adminAdd = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //const adminId = req.user.id;
    // const userData = await User.findById(adminId);
    // if (!userData || userData.role !== "admin") {
    //   return res.status(200).json({ message: "Invalid access" });
    // }

    const { userId, from, reference, type, category, description } = req.body;

    const amount = req.body.amount * 100;

    if (!userId || !reference || !type || !category || !amount) {
      return res.status(200).json({ message: "Missing required fields." });
    }

    const userExists = await User.findById(userId).session(session);
    const referenceUserExists = await User.findById(reference).session(session);

    if (!userExists || !referenceUserExists) {
      return res.status(200).json({ message: "User or reference not found." });
    }

    if (type === "withdraw") {
      // Perform validation before the withdrawal
      let currentBalance;

      if (category === "investment") {
        currentBalance = userExists.investmentAmount;
      } else if (category === "investmentEarning") {
        currentBalance = userExists.investmentEarning;
      } else if (category === "referralEarning") {
        currentBalance = userExists.referralEarning;
      }

      // Ensure the balance does not go negative
      if (currentBalance < amount) {
        await session.abortTransaction();
        session.endSession();
        return res.status(200).json({ message: "Insufficient balance." });
      }
    }

    if (type === "deposit") {
      let currentBalance = userExists.investmentAmount;
      if (
        currentBalance + amount < 10000000 ||
        currentBalance + amount > 15000000
      ) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(200)
          .json({ message: "Investement amount range overflow." });
      }
    }

    // Proceed with creating the transaction and updating the user's balance
    const newTransaction = new Transaction({
      userId,
      from,
      reference,
      type,
      category,
      amount,
      description,
    });

    const savedTransaction = await newTransaction.save({ session });

    if (savedTransaction) {
      if (type === "deposit") {
        if (category === "investment") {
          await User.findByIdAndUpdate(
            userId,
            { $inc: { investmentAmount: amount } },
            { new: true, session }
          );
        } else {
          await session.abortTransaction();
          return res.status(200).json({ message: "Not a valid category." });
        }
      } else if (type === "withdraw") {
        let updateCondition = {};
        if (category === "investment") {
          updateCondition = { $inc: { investmentAmount: -amount } };
        } else if (category === "investmentEarning") {
          updateCondition = { $inc: { investmentEarning: -amount } };
        } else if (category === "referralEarning") {
          updateCondition = { $inc: { referralEarning: -amount } };
        }

        await User.findByIdAndUpdate(userId, updateCondition, {
          new: true,
          session,
        });
      }
    } else {
      await session.abortTransaction();
      return res.status(200).json({ message: "Transaction failed." });
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating transaction:", error);
    return res.status(500).json({ message: "Failed", error });
  }
};

exports.getAdminTransactions = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(200).json({
        message: "Please provide both start and end dates.",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    end.setHours(23, 59, 59, 999);

    const transactions = await Transaction.find({
      date: {
        $gte: start,
        $lte: end,
      },
    })
      .populate({ path: "userId", select: "email -_id" })
      .populate({ path: "reference", select: "email -_id" });

    return res.status(200).json({
      message: "success",
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions by date range:", error);
    return res.status(200).json({
      message: "Server error",
      error,
    });
  }
};

exports.getUserTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "Please provide both start and end dates.",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    end.setHours(23, 59, 59, 999);

    const userTransactions = await Transaction.find({
      userId,
      date: {
        $gte: start,
        $lte: end,
      },
    })
      .populate({ path: "userId", select: "email -_id" })
      .populate({ path: "reference", select: "email -_id" });

    // If transactions are found, return them
    if (userTransactions.length > 0) {
      return res.status(200).json({
        message: "success",
        data: userTransactions,
      });
    } else {
      return res.status(200).json({
        message: "No transactions found within the provided date range.",
      });
    }
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    return res.status(200).json({
      message: "Server error",
      error,
    });
  }
};

exports.addReferralEarning = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find users who have referrals
    const users = await User.find({
      referrals: { $exists: true, $not: { $size: 0 } },
    }).session(session);

    for (const user of users) {
      let totalEarnings = 0;
      const referralCount = user.referrals.length;
      let percentage = 36; // Default percentage is 3%

      // Determine the percentage based on the referral count
      if (referralCount >= 4 && referralCount <= 9) percentage = 48;
      else if (referralCount >= 10 && referralCount <= 27) percentage = 60;
      else if (referralCount >= 28 && referralCount <= 81) percentage = 72;
      else if (referralCount >= 82 && referralCount <= 243) percentage = 84;
      else if (referralCount >= 244 && referralCount <= 729) percentage = 96;
      else if (referralCount >= 730) percentage = 108;

      // Iterate through each referral and calculate earnings
      for (const referralId of user.referrals) {
        const referral = await User.findById(referralId).session(session);
        if (!referral) continue;
        if (referral.investmentAmount < 10000000) continue;

        const referralEarningPerDay = Math.round(
          (referral.investmentAmount * percentage) / 100 / 365
        );

        if (referralEarningPerDay === 0) {
          continue;
        }

        totalEarnings += referralEarningPerDay;

        // Create a new transaction for each referral's earnings
        const newTransaction = new Transaction({
          userId: user._id,
          from: "system",
          reference: referral._id, // Referral's ObjectId (whose investmentAmount is being used)
          type: "deposit",
          category: "referralEarning",
          amount: referralEarningPerDay,
          description: `Referral earnings based on referral's(${referral._id}) investment of ${referral.investmentAmount} at ${percentage}% rate.`,
        });

        // Save the transaction
        const savedTransaction = await newTransaction.save({ session });
        if (!savedTransaction) throw new Error("Transaction saving failed");
      }

      // Update user's referral earnings after calculating totalEarnings
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $inc: { referralEarning: totalEarnings } }, // Increment referralEarning by totalEarnings
        { new: true, session }
      );

      if (!updatedUser)
        throw new Error("Failed to update user's referral earnings");
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({
      message: "success",
    });
  } catch (err) {
    // Rollback in case of failure
    await session.abortTransaction();
    session.endSession();
    return res
      .status(200)
      .json({ message: `Error calculating referral earnings: ${err.message}` });
  }
};

exports.addInvestmentEarning = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch all users with an investmentAmount >= 10000000
    const users = await User.find({
      investmentAmount: { $gte: 10000000 },
    }).session(session);

    for (const user of users) {
      let percentage = 0;

      // Determine the percentage based on the investmentAmount
      if (
        user.investmentAmount >= 10000000 &&
        user.investmentAmount < 15000000
      ) {
        percentage = 180;
      } else if (user.investmentAmount >= 15000000) {
        percentage = 240;
      }

      // Calculate the earning amount
      const earningPerDay = Math.round(
        (user.investmentAmount * percentage) / 100 / 365
      );

      // Create a new transaction for the investment earning
      const newTransaction = new Transaction({
        userId: user._id,
        from: "system",
        reference: user._id,
        type: "deposit",
        category: "investmentEarning",
        amount: earningPerDay,
        description: `Investment earnings calculated at ${percentage}% for an investment of ${user.investmentAmount}.`,
      });

      // Save the transaction
      const savedTransaction = await newTransaction.save({ session });
      if (!savedTransaction) throw new Error("Transaction saving failed");

      // Update user's investmentEarning field
      await User.findByIdAndUpdate(
        user._id,
        { $inc: { investmentEarning: earningPerDay } },
        { session }
      );
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "success" });
  } catch (err) {
    // Abort the transaction in case of any error
    await session.abortTransaction();
    session.endSession();

    return res.status(200).json({
      message: `Error calculating investment earnings: ${err.message}`,
    });
  }
};

///////////////////////////example Calculation///////////////////////
exports.maths = (req, res) => {
  const interestRate = req.params.rate;
  const amount = req.params.amount;

  let interestPerDay = ((amount / 100) * interestRate) / 365;

  let interestAnnual = (amount / 100) * interestRate;

  //let dayToAnnual = Math.round(interestPerDay*365);
  let dayToAnnual = interestPerDay * 365;

  let error = interestAnnual - dayToAnnual;

  res.status(200).json({ interestPerDay, interestAnnual, dayToAnnual, error });
};
