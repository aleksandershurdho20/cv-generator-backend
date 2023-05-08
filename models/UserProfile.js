const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;


const userProfileSchema = new mongoose.Schema({

    user:{
        type:ObjectId,
        required:true
    },

    name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    phone:{
        type:Number,
    },
    
    address:{
        type:String,
    },

    city:{
        type:String,
    },


})


module.exports = mongoose.model("UserProfile",userProfileSchema)