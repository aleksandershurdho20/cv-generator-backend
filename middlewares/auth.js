const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken  =  async(req,res,next) =>{
    try {
        const token = req.headers.authorization
        console.log(req.headers.authorization)
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken._id;
        console.log(decodedToken)
        const userData = await User.findById(userId)
        res.send(userData)
        // if (req.body.userId && req.body.userId !== userId) {
        //   throw 'Invalid user ID';
        // } else {
        //   next();
        // }
      } catch (error) {
        // console.log(error)
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
}

module.exports={
    verifyToken
}