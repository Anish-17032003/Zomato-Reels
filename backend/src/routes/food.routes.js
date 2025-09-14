const express=require('express');
const router = express.Router();
const foodController=require('../controllers/food.controller');
const authMiddleware=require('../middlewares/auth.middleware');
const multer=require('multer');

const upload=multer({
    storage:multer.memoryStorage(),

})



// aur yeh jo hamari api h isse hamara food item add hora h to food item add kon kr rha h food partner to isliye yeh hamari protected honi chahiyeee
router.post('/',authMiddleware.authFoodPartnerMiddleware,upload.single("video"),foodController.createFood); //string ke andr jo video h wo aeve hi nhi diya blki jo frontend me uska naam h jese ki humne postman me uska video se naam save kiya h video ka to humx isme wahi daal skte h

/* GET /api/food/ [protected ] yeh hum bnaynge users ke liye ki jab user scroll krenge to jo jo nayi videos ayngi scroll krte krte wo sari videos ka data lane ke liye yeh api madat kregi aur yeh bhi protected banegi */

router.get('/',authMiddleware.authUserMiddleware,foodController.getFoodItems); 


router.post('/like',authMiddleware.authUserMiddleware,foodController.likeFood);


router.post('/save',authMiddleware.authUserMiddleware,foodController.saveFood);

router.get('/save',authMiddleware.authUserMiddleware,foodController.getSavedFoods);

module.exports=router;
