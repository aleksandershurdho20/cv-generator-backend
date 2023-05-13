const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userProfileSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
  },

  address: {
    type: String,
  },

  city: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male",
  },

  image: {
    type: String,
  },

  experience: [
    {
      position: {
        type: String,
        required: true,
      },

      company: {
        type: String,
        required: true,
      },
      start_date: {
        type: String,
        required: true,
      },
      end_date: {
        type: String,
        required: true,
      },
      month_start_date: {
        type: String,
        required: true,
      },
      month_end_date: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
    },
  ],

  education: [
    {
      diploma: {
        type: String,
        required: true,
      },
      university: {
        type: String,
        required: true,
      },
      city: {
        type: String,
      },
      start_date: {
        type: String,
        required: true,
      },
      end_date: {
        type: String,
        required: true,
      },
      month_start_date: {
        type: String,
        required: true,
      },
      month_end_date: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
    },
  ],

  skills: [{
    title:{
        type:String
    }
  }],

  languages: [
    {
      title: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
