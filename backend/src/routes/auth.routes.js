const express=require('express');
const authController=require('../controllers/auth.controller')
const { authUserMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();
// user Auth APIs
router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser);

// verify current user (used by frontend route guard)
router.get('/user/me', authUserMiddleware, authController.getCurrentUser);

// generic session endpoint for both users and food partners
router.get('/me', authController.getSession);

// food partner Auth APIs
router.post('/food-partner/register',authController.registerFoodPartner)
router.post('/food-partner/login',authController.loginFoodPartner)
router.get('/food-partner/logout',authController.logoutFoodPartner);

module.exports=router;