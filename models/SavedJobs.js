const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;

const savedJobsSchema = new mongoose.Schema({

    job:{
        type:ObjectId,
        ref:"Jobs",
        required:true

    },
    user:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    is_saved:{
        type:Boolean,
        default:false
    }
})


module.exports = mongoose.model("SavedJobs",savedJobsSchema)