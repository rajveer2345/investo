const transaction = require("../schema/transactionSchema");
const User = require("../schema/userSchema");

exports.adminAddXX = async (req, res) => {
  try {
    const adminId = req.user.id;

    const userData = await User.findById(adminId);
    if (!userData || userData.role !== "admin") {
      return res.status(200).json({ message: "Invalid access" });
    }
    const { userId, from, reference, type, category, amount, description } =
      req.body;

    if (!userId || !reference || !type || !category || !amount) {
      return res.status(200).json({ message: "Missing required fields." });
    }

    //userId = user account in which money added or removed
    //from = who initiated transaction system or admin
    //reference = who send of withdraw money
    //type = deposit or withdrawal
    //category = invested or earned
    //amount = amount of money
    //description = optional description

    const userExists = await User.findById(userId);
    const referenceUserExists = await User.findById(reference);

    if (!userExists || !referenceUserExists) {
      return res.status(200).json({ message: "User or reference not found." });
    }

    const newTransaction = new transaction({
      userId,
      from,
      reference,
      type,
      category,
      amount,
      description,
    });

    const savedTransaction = await newTransaction.save();

    if (savedTransaction) {
      if (type === "deposit") {
        if (category === "investment") {
          const investmentUpdate = await User.findByIdAndUpdate(
            userId,
            { $inc: { investmentAmount: amount } },
            { new: true }
          );

          if (!investmentUpdate) {
            return res.status(200).json({ message: "User not Updated." });
          }
        } else {
          return res.status(200).json({ message: "Not a valid category." });
        }
      } else if (type === "withdraw") {
        if (category === "investmentEarning") {
          const investmentEarningUpdate = await User.findByIdAndUpdate(
            userId,
            { $inc: { investmentEarning: -amount } },
            { new: true }
          );

          if (!investmentEarningUpdate) {
            return res.status(200).json({ message: "User not Updated." });
          }
        } else if (category === "referralEarning") {
          const referralEarningUpdate = await User.findByIdAndUpdate(
            userId,
            { $inc: { referralEarning: -amount } },
            { new: true }
          );

          if (!referralEarningUpdate) {
            return res.status(200).json({ message: "User not Updated." });
          }
        } else if (category === "investment") {
          const investmentUpdate = await User.findByIdAndUpdate(
            userId,
            { $inc: { investmentAmount: -amount } },
            { new: true }
          );

          if (!investmentUpdate) {
            return res.status(200).json({ message: "User not Updated." });
          }
        } else {
          return res.status(200).json({ message: "Not a valid category." });
        }
      } else {
        return res.status(200).json({ message: "Not a valid type." });
      }
    } else {
      return res.status(200).json({ message: "Transation failed." });
    }

    return res.status(200).json({
      message: "success",
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return res.status(200).json({ message: "failed", error: error });
  }
};

exports.adminAdd = async (req, res) => {
  const session = await User.startSession();
  session.startTransaction();
  
  try {
    const adminId = req.user.id;
    const userData = await User.findById(adminId);
    if (!userData || userData.role !== "admin") {
      return res.status(200).json({ message: "Invalid access" });
    }

    const { userId, from, reference, type, category, amount, description } = req.body;

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

    // Proceed with creating the transaction and updating the user's balance
    const newTransaction = new transaction({
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


exports.systemAdd = async (req, res) => {
  try {
  } catch (err) {}
};
