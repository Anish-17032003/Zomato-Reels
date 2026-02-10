const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodpartner"
    },
    likeCount:{
        type:Number,
        default:0
    }
    ,
    savesCount: {
        type: Number,
        default: 0
    }
})

const foodModel=mongoose.model("fooditem",userSchema);
module.exports=foodModel;