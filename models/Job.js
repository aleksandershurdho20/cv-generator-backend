const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,

    },

    jobType: {
      type: String,
      enum: ["full_time", "part_time", "remote","internship"],
      default: "full_time",
      required: true,
    },
    
    wage: {
      type: Number,
    },

    numberOfApplications: {
      type: Number,
      default: 0,
    },

    experience: {
      type: Number,
      required:true,
    },

    category: {
      type: String,
    },

    skills: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", jobSchema);
