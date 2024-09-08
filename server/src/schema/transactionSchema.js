const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    reference: {
      type: String,
    },
    orderId: {
      type: String,
    },
    type: {
      type: String,
      enum: ["deposit", "withdraw"], // Restrict values to "Deposit" or "Withdrawal"
      required: true,
    },
    category: {
      type: String,
      enum: ["investment", "", "EW"], // Restrict values to "Deposit" or "Withdrawal"
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0, // Ensure that the amount is non-negative
    },
    date: {
      type: Date,
      default: Date.now, // Default to current date and time if not provided
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"], // Restrict values to "Pending", "Completed", or "Failed"
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Transaction model
const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
