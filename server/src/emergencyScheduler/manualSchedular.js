const { addInvestment, addReferral } = require("../scheduler/scheduler");


exports.addReferralManual = (req, res) => {
  try {
    addReferral();
    res
      .status(200)
      .json({
        message:
          "adding referral earning manually started. check your email for final status.",
      });
  } catch (error) {
    res.status(200).json({ message: "failure", error });
  }
};
exports.addInvestmentManual = (req, res) => {
  try {
    addInvestment();
    res
      .status(200)
      .json({
        message:
          "adding investment earning manually started. check your email for final status.",
      });
  } catch (error) {
    res.status(200).json({ message: "failure", error });
  }
};
