const mongoose=require("mongoose");

function connectdb(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Mongo Db connected");
        
    })
    .catch((err)=>{
        console.log("Mongodb connection failed:",err);
        
    })
}
module.exports=connectdb