const mongoose=require('mongoose');


const saveSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"fooditem",
        required:true
    }
},{
    timestamps:true
})
// ensure a user can only save a given food once
saveSchema.index({ user: 1, food: 1 }, { unique: true });
const saveModel=mongoose.model("save",saveSchema);
module.exports=saveModel;