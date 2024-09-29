const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the User model
      required: true,
    },
    from: {
      type: String,
      enum: ["admin", "system"],
      required: true,
    },
    reference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", 
      required: true,
    },
    type: {
      type: String,
      enum: ["deposit", "withdraw"], // Restrict values to "Deposit" or "Withdrawal"
      required: true,
    },
    category: {
      type: String,
      enum: ["investment", "investmentEarning", "referralEarning"], // Restrict values to "Deposit" or "Withdrawal"
      required: true,
    },
    balanceAfter: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0, 
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


const transaction = mongoose.model("transaction", transactionSchema);

module.exports = transaction;
