const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;


const applicantsSchema = new mongoose.Schema({

    // candidate:{
    //     type:ObjectId,
    //     required:true,
    //     ref:"User",
    //     // index:true,

    //     // unique:true,
    // },

    candidate:{
        type:ObjectId,
        ref:"User"
    },

    job:{
        type:ObjectId,
        required:true,
        ref:"Jobs",
        // index:true,
        // unique:true,


    },

    is_confirmed:{
        type:Boolean,
        default:false
    },

    status: {
        type: String,
        enum: ["applied", "shortlisted", "rejected"],
        default: "applied",
      },
    

},{timestamps:true})

module.exports = mongoose.model("Applicants",applicantsSchema)