const express=require('express');
const router=express.Router();
const userController=require("../controller/userController");
const transactionController=require("../controller/transactionController");
const adminValidation=require("../auth/adminValidate")
const authenticateToken = require("../auth/auth")



//user Routes

router.post('/user/signup',userController.signup);
router.post('/user/login',userController.login);
router.get('/user/exists/:id',userController.isExist)
router.get('/user/verifyemail/:token',userController.verifyEmail)
router.get('/user/get-user-data', authenticateToken,userController.getUserData);
router.get('/user/get-referral-data', authenticateToken,userController.getUserReferrals);
router.get('/user/fetch-user-data/:email',authenticateToken,adminValidation,userController.fetchUser); //admin route
router.get('/user/get-total-investment',authenticateToken,adminValidation, userController.getTotalInvestment); //admin route
router.get('/user/get-total-users',authenticateToken,adminValidation,userController.getTotalUsers); //admin route
router.get('/user/get-analytics',authenticateToken,adminValidation,userController.getAnalytics); //admin route




//transaction routes

router.post('/transaction/admin-add',  authenticateToken, adminValidation, transactionController.adminAdd) //admin route

router.get('/transaction/get-admin-transactions', authenticateToken, adminValidation, transactionController.getAdminTransactions) //admin route
router.get('/transaction/get-user-transactions', authenticateToken, transactionController.getUserTransactions)


module.exports = router;