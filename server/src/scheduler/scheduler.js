const cron = require("node-cron");
const axios = require("axios");
const Transaction = require("../schema/transactionSchema");
const User = require("../schema/userSchema");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rajveershekhar.singh@gmail.com",
    pass: "qkbldjatxrfwdpwu",
  },
});
// // First API Scheduler
// const callFirstApi = async () => {
//   try {
//     const response1 = await axios.post(
//       `${process.env.API_BASE_URL}transaction/investment-earning/system-add`,
//       {},
//       { headers: { 'x-api-key': `${process.env.EXPECTED_API_KEY}` } }
//     );
//     console.log('Investment Earning API called successfully:', response1.data);
//   } catch (error) {
//     console.error('Error calling API1, retrying in 5 seconds:', error.message);
//     await new Promise(resolve => setTimeout(resolve, 5000));
//     return callFirstApi(); // Retry the API call
//   }
// };

// // Second API Scheduler
// const callSecondApi = async () => {
//   try {
//     const response2 = await axios.post(
//       `${process.env.API_BASE_URL}transaction/referral-earning/system-add`,
//       {},
//       { headers: { 'x-api-key': `${process.env.EXPECTED_API_KEY}` } }
//     );
//     console.log('Referral Earning API called successfully:', response2.data);
//   } catch (error) {
//     console.error('Error calling API2, retrying in 5 seconds:', error.message);
//     await new Promise(resolve => setTimeout(resolve, 5000));
//     return callSecondApi(); // Retry the API call
//   }
// };

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
    return "success";
  } catch (err) {
    // Rollback in case of failure
    await session.abortTransaction();
    session.endSession();
    console.log(err, ":error")
    return "failure";
  }
};

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
    
    return "success"
  } catch (err) {
    // Abort the transaction in case of any error
    await session.abortTransaction();
    session.endSession();
    console.log(err, ":error")
    return "failure"
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
        break; // Exit the loop if success is returned
      } else {
        console.log('addInvestmentEarning returned failure, retrying...');
      }
    }
  
    if (result !== "success") {
      await transporter.sendMail({
        to: "rajveershekhar.singh@gmail.com",
        subject: "Adding investment income failed.",
        html: `Adding investment income failed.`,
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
        break; // Exit the loop if success is returned
      } else {
        console.log('addReferralEarning returned failure, retrying...');
      }
    }
  
    if (result !== "success") {
      await transporter.sendMail({
        to: "rajveershekhar.singh@gmail.com",
        subject: "Adding referral income failed.",
        html: `Adding referral income failed.`,
      });
      console.log('Max attempts reached. addReferralEarning Function did not succeed.');
    }

};

// Schedule the first API call (e.g., every day at 12 AM)
const investmentScheduler = () => {
  //cron.schedule("*/3 * * * *", addInvestment);
  cron.schedule('0 0 * * *', addInvestment); // Runs at midnight

  console.log(
    "Scheduler for API1 (Investment Earning) set to run every day at 12 AM."
  );
};

// Schedule the second API call (e.g., every 2 minutes)
const referralSchedular = () => {
  //cron.schedule("*/2 * * * *", addReferral);
  cron.schedule('0 1 * * *', addReferral); // Runs 1AM everyday
  console.log(
    "Scheduler for API2 (Referral Earning) set to run every day at 1 AM."
  );
};

module.exports = {
  investmentScheduler,
  referralSchedular,
};
