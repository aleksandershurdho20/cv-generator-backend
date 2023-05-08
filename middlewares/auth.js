const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CompanyProfile = require('../models/CompanyProfile');
const UserProfile = require('../models/UserProfile');

const verifyToken  =  async(req,res,next) =>{
    try {
        const token = req.headers.authorization
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken._id;
        const userData = await User.findById(userId).select("-password")
        if(userData.role[0] == "company"){
            const companyProfile = await CompanyProfile.findOne({user:userId})
              // res.send(userData)
              const obj = {
                ...userData,
                profile:companyProfile
              }
            res.json({userData,
              profile:companyProfile})
        }
        else {
            const userProfile = await UserProfile.findOne({user:userId})
            res.json(userProfile)
            res.json({...userData,
              profile:userProfile})

        }
        // res.send(userData)
        // if (req.body.userId && req.body.userId !== userId) {
        //   throw 'Invalid user ID';
        // } else {
        //   next();
        // }
      } catch (error) {
        console.log(error)
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
}

module.exports={
    verifyToken
}