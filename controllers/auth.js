const User = require('../models/User.js')
const { hashPassword, comparePassword } = require('../utils/auth')
const jwt = require('jsonwebtoken')
const register = async (req, res) => {
    const {  email, password, role } = req.body;


    try {
        const existUser = await User.findOne({ email });
        if (existUser) return res.status(400).send("Email is already taken!");
        const hashedPassword = await hashPassword(password);
        const user = new User({
            email,
            password: hashedPassword,
            role
        })
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error");
    }
}

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("Email or password incorrect");
      }
  
      const matchPassword = await comparePassword(password, user.password);
      if (!matchPassword) {
        return res.status(400).send("Email or password incorrect");
      }
  
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      user.password = undefined;
      res.status(200).json({ ...user._doc, token });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }

module.exports = {
    register,
    login
}