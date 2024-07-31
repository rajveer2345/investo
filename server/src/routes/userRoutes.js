const express=require('express');
const router=express.Router();
const userController=require("../controller/userController");
const authenticateToken = require("../auth/auth")



router.post('/user/signup',userController.signup);
router.post('/user/login',userController.login);
router.get('/user/exists/:id',userController.isExist)
router.get('/user/verifyemail/:token',userController.verifyEmail)

router.get('/user/getuserdata', authenticateToken,userController.getUserData);



module.exports = router;