const express=require("express");
const cookieParser=require('cookie-parser')
const authRoutes=require('./routes/auth.routes');
const foodRoutes=require('./routes/food.routes');
const foodPartnerRoutes=require('./routes/food-partner.routes');
const cors=require('cors');
const app=express();
app.use(cookieParser()) 
app.use(express.json())  //yeh tumahara jo data frontend se ata h use readable bnata h....
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
app.get('/',function(req,res){
    res.send("hello world");
})
app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);
app.use('/api/food-partner',foodPartnerRoutes);
module.exports=app;