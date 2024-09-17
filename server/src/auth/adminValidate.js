const User = require("../schema/userSchema");

const adminValidation = async (req, res, next) => {
  try{
    const adminId = req.user.id;
    const adminData = await User.findById(adminId);
    if (!adminData || adminData.role !== "admin") {
      return res.status(200).json({ message: "Invalid access" });
    }
    next();
  }catch(error){
    return res.status(200).json({ message: "Error validating role." });
  }
   
};

module.exports = adminValidation;
