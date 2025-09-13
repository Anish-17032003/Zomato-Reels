const userModel=require('../models/user.model');
const foodPartnerModel=require('../models/foodpartner.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

async function registerUser(req,res) {
    const {fullname,email,password}=req.body;
    const userAlreadyExists= await userModel.findOne({
        email
    })
    if(userAlreadyExists){
        return res.status(400).json({     //
            message:"User already exists"
        })
    }

    // agar koi user exist na kre to haume user create krn pdega aur usse pehle uska password hume hash krna pdega agar by chance data leak ho jaye to user ki safety ensure rahe isliye hume password ko hash krna imp h uske liye hume ek package/library install krna pdega npm i bcryptjs 
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await userModel.create({
        fullname,
        email,
        password:hashedPassword
    })
    //technically hamara user create to ho chuka h pr jab agli bar user req kre to pta to chle kaha se request ari h to uske liye hum bnaynge tokens joki hamara cookies me store hote h aur iske liye ek pacakage h jsonwebtoken cookie-parser cookie parser me token save honge
    const token=jwt.sign({
        id:user ._id  //id unique hoti h isliye hum unique data dete h
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:"User registered successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullname:user.fullname
        }
    })

}
async function loginUser(req,res) {
    const{email,password}=req.body

    const user=await userModel.findOne({
        email
    })
    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const passwrodIsValid=await bcrypt.compare(password,user.password);
    if(!passwrodIsValid){
        return res.status(400).json({
            message:"Invalid email or password"
    }
)
}
const token=jwt.sign({
    id:user._id,
},process.env.JWT_SECRET)  //JWT_SECRET ko hum jab tak use nhi kr skte jab tk hamare pass inka dotenv package na ho nhi to inki value undefined aygi
 
res.cookie("token",token)
res.status(201).json({
        message:"User logged in successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullname:user.fullname
        }
    })
}

function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"User Logged out successfully"
    });
}
//so we have successfully created the api for user and now next step is to create the api for food partner

async function registerFoodPartner(req,res) {
    const {name,email,password}=req.body;
    const isAccountAlreadyExists=await foodPartnerModel.findOne({
        email
    })
    if(isAccountAlreadyExists){
        return res.status(400).json({
            message:"Food partner account already exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const foodPartner =await foodPartnerModel.create({
        name,
        email,
        password:hashedPassword
    });
    const token=jwt.sign({
        id:foodPartner._id
    },process.env.JWT_SECRET)
    res.cookie("token",token);
    res.status(201).json({
        message:"Food partner registered successfully",
        foodPartner:{
            _id:foodPartner._id,
            email:foodPartner.email,
            name:foodPartner.name
        }

    })
    
}
async function loginFoodPartner(req,res) {
    const {email,password}=req.body;
    const foodPartner=await foodPartnerModel.findOne({
        email
    })
    if(!foodPartner){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const passwordIsValid=await bcrypt.compare(password,foodPartner.password);
    if(!passwordIsValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const token=jwt.sign({
        id:foodPartner._id
    },process.env.JWT_SECRET)
    res.cookie("token",token);
    res.status(200).json({
        message:"Food partner logged in successfully",
        foodPartner:{
            _id:foodPartner._id,
            email:foodPartner.email,
            name:foodPartner.name
        }
    })
}

function logoutFoodPartner(req,res) {
    res.clearCookie("token");
    res.status(200).json({
        message:"Food partner logged out successfully"
    })
}

// ab hum bnaynge function taki food partner items add kr payee
module.exports={
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}