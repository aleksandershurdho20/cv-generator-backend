const CompanyProfile = require("../models/CompanyProfile");
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");

const createProfile = async (req, res) => {
  const { user } = req.body;
  try {
    const userData = await User.findById(user);
    if (userData.role[0] == "company") {
      const companyProfile = await new CompanyProfile(req.body).save();
      await User.updateOne(
        { _id: user },
        {
          $set: {
            companyProfileId: companyProfile._id,
          },
        }
      );

      res.status(201).json(companyProfile);
    } else {
      console.log(req.body,'body')
      const userProfile = await new UserProfile(req.body).save();
      await User.updateOne(
        { _id: user },
        {
          $set: {
            userProfileId: userProfile._id,
          },
        }
      );

      res.status(201).json(userProfile);
    }
  } catch (error) {
    console.log(error, "r");
    res.status(500).send(error);
  }
};

const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await User.findById(id);
    if (userData.role[0] == "company") {
      const companyProfile = await CompanyProfile.find({ user: id });
      res.json(companyProfile);
    } else {
      const userProfile = await UserProfile.find({ user: id });
      res.json(userProfile);
    }
  } catch (error) {}
};

const updateProfile = async(req,res) =>{
  const { user } = req.params;
  try {
    const userData = await User.findById(user);
    if (userData.role[0] == "company") {
      const companyProfile = await  CompanyProfile.findByIdAndUpdate(req.body._id,req.body)
    

      res.status(201).json(companyProfile);
    } else {
      const userProfile = await  UserProfile.findByIdAndUpdate(req.body._id,req.body)
   

      res.status(201).json(userProfile);
    }
  } catch (error) {
    console.log(error, "r");
    res.status(500).send(error);
  }
}
module.exports = {
  createProfile,
  getProfile,
  updateProfile
};
