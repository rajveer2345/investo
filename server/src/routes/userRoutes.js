const express=require('express');
const router=express.Router();
const userController=require("../controller/userController");
const newsController=require("../controller/newsController");
const transactionController=require("../controller/transactionController");
const adminValidation=require("../auth/adminValidate")
const authenticateToken = require("../auth/auth")
const APIKeyValidation = require("../auth/APIKeyValidation")

const manualSchedular=require("../emergencyScheduler/manualSchedular");


//user Routes

router.post('/user/signup',userController.signup);
router.post('/user/login',userController.login);
router.get('/user/exists/:id',userController.isExist)
router.get('/user/verifyemail/:token',userController.verifyEmail)
router.get('/user/get-user-data', authenticateToken,userController.getUserData);
router.get('/user/get-referral-data', authenticateToken,userController.getUserReferrals);
router.get('/user/fetch-user-data-email/:email',authenticateToken,adminValidation,userController.fetchUserByEmail); //admin route
router.get('/user/fetch-user-data-id/:id',authenticateToken,adminValidation,userController.fetchUserById); //admin route
router.get('/user/get-total-investment',authenticateToken,adminValidation, userController.getTotalInvestment); //admin route
router.get('/user/get-total-users',authenticateToken,adminValidation,userController.getTotalUsers); //admin route
router.get('/user/get-analytics',authenticateToken,adminValidation,userController.getAnalytics); //admin route

//transaction routes

router.post('/transaction/admin-add',  authenticateToken, adminValidation, transactionController.adminAdd) //admin route
router.get('/transaction/get-admin-transactions', authenticateToken, adminValidation, transactionController.getAdminTransactions) //admin route
router.get('/transaction/get-user-transactions', authenticateToken, transactionController.getUserTransactions)


//news routes

router.post('/news/create-news', authenticateToken, adminValidation, newsController.createNews);
router.get('/news/get-all-news', authenticateToken, newsController.getAllNews);
router.delete('/news/delete-news/:id', authenticateToken, adminValidation, newsController.deleteNews);
router.put('/news/update-news/:id', authenticateToken, adminValidation, newsController.updateNews);


//Emergency schedular routes

router.post('/transaction/investment-earning/system-add',APIKeyValidation, manualSchedular.addInvestmentManual);
router.post('/transaction/referral-earning/system-add',APIKeyValidation, manualSchedular.addReferralManual);



//math route
router.get('/maths/:rate/:amount',transactionController.maths)






module.exports = router;