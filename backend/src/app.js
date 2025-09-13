const express=require("express");
const cookieParser=require('cookie-parser')
const authRoutes=require('./routes/auth.routes');
const foodRoutes=require('./routes/food.routes');
const foodPartnerRoutes=require('./routes/food-partner.routes');
const cors=require('cors');
const app=express();
app.use(cookieParser()) 
app.use(express.json())  


const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const allowedOrigins = [FRONTEND_URL, 'https://zomato-reels-frontend5.onrender.com'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))
app.get('/',function(req,res){
    res.send("hello world");
})
app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);
app.use('/api/food-partner',foodPartnerRoutes);

module.exports=app;