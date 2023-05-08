const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;


const companyProfileSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        required:true,
        ref:"User"
    },
    image:{
        type:String
    },
    name:{
        type:String,
        required:true
    },

    size:{
        type:Number,
        required:true,
        min:1,
        
    },

    location:{
        type:String,
        required:true
    },

    industry:{
        type:String,
        required:true
    }

})


module.exports = mongoose.model("CompanyProfile",companyProfileSchema)