const cron = require("node-cron");
const axios = require("axios");
const Transaction = require("../schema/transactionSchema");
const User = require("../schema/userSchema");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "agoldalliance0278@gmail.com",
    pass: "vfbsueubzizthqxv",
  },
});



const addInvestmentEarning = async () => {
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

      const balanceAfter = user.investmentEarning+earningPerDay;

      // Create a new transaction for the investment earning
      const newTransaction = new Transaction({
        userId: user._id,
        from: "system",
        reference: user._id,
        type: "deposit",
        category: "investmentEarning",
        amount: earningPerDay,
        balanceAfter: balanceAfter,
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
    
    return "success"
  } catch (err) {
    // Abort the transaction in case of any error
    await session.abortTransaction();
    session.endSession();
    console.log(err, ":error")
    return "failure"
  }
};

const addReferralEarning = async () => {
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

        const balanceAfter = user.referralEarning+totalEarnings;

        // Create a new transaction for each referral's earnings
        const newTransaction = new Transaction({
          userId: user._id,
          from: "system",
          reference: referral._id, // Referral's ObjectId (whose investmentAmount is being used)
          type: "deposit",
          category: "referralEarning",
          amount: referralEarningPerDay,
          balanceAfter: balanceAfter,
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
    return "success";
  } catch (err) {
    // Rollback in case of failure
    await session.abortTransaction();
    session.endSession();
    console.log(err, ":error")
    return "failure";
  }
};

const addInvestment = async () => {
    let maxAttempts = 10; // Max attempts
    let attempt = 0;
    let result = '';
  
    while (attempt < maxAttempts) {
      attempt++;
      result = await addInvestmentEarning(); // Call the function
  
      if (result === "success") {
        console.log('addInvestmentEarning returned success.');
        await transporter.sendMail({
          to: "rajveershekhar.singh@gmail.com",
          subject: `Adding investment Earning successful.`,
          html: `Adding investment Earning successful at ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata" })} in ${attempt} attempt.`,
        });
        break; // Exit the loop if success is returned
      } else {
        console.log('addInvestmentEarning returned failure, retrying...');
      }
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  
    if (result !== "success") {
      await transporter.sendMail({
        to: "rajveershekhar.singh@gmail.com",
        subject: "Adding investment income failed.",
        html: `Adding investment income failed at ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata" })}.`,
      });
      console.log('Max attempts reached. addInvestmentEarning Function did not succeed.');
    }
  };
  

const addReferral = async () => {
    let maxAttempts = 10; // Max attempts
    let attempt = 0;
    let result = '';
  
    while (attempt < maxAttempts) {
      attempt++;
      result = await addReferralEarning(); // Call the function
  
      if (result === "success") {
        console.log('addReferralEarning returned success.');
        await transporter.sendMail({
          to: "rajveershekhar.singh@gmail.com",
          subject: `Adding referral Earning successful.`,
          html: `Adding referral Earning successful at ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata" })} in ${attempt} attempt.`,
        });
        
        break; // Exit the loop if success is returned
      } else {
        console.log('addReferralEarning returned failure, retrying...');
      }
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  
    if (result !== "success") {
      await transporter.sendMail({
        to: "rajveershekhar.singh@gmail.com",
        subject: "Adding referral income failed.",
        html: `Adding referral income failed at ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata" })}.`,
      });
      console.log('Max attempts reached. addReferralEarning Function did not succeed.');
    }

};

// Schedule the first API call (e.g., every day at 12 AM)
const investmentScheduler = () => {
  //cron.schedule("*/3 * * * *", addInvestment);
  cron.schedule('0 2 * * *', addInvestment,{timezone: "Asia/Kolkata"});

  console.log(
    "Scheduler for API1 (Investment Earning) set to run every day."
  );
};


const referralSchedular = () => {

  cron.schedule('0 3 * * *', addReferral,{timezone: "Asia/Kolkata"}); 
  console.log(
    "Scheduler for API2 (Referral Earning) set to run every day"
  );
};

module.exports = {
  investmentScheduler,
  referralSchedular,
  addInvestment,
  addReferral
};
