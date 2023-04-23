const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: [String],

        default: ['User'],
        enum: ["User", "Company", "Admin"],
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)