const Jobs = require("../models/Job");
const SavedJobs = require("../models/SavedJobs");
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");

const createJob = async (req, res) => {
  try {
    await new Jobs(req.body).save();
    return res.status(201).send("Job created succesfully!");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find({}).populate({
      path: "company",
      select: "_id",
      populate: [
        {
          path: "companyProfileId",
          select: "industry location name size image",
        },
      ],
    })
    return res.json({ jobs });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getFilteredJobs = async (req, res) => {
  const { title, jobType } = req.query;
  const test = title === "undefined";
  const second = jobType === "undefined";
  const filters = {
    ...(!test && {
      title: {
        $regex: title,
        $options: "i",
      },
    }),
    ...(!second && { jobType: jobType }),
  };
  try {
    const jobs = await Jobs.find(filters);
    res.status(200).send({ jobs });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Jobs.findById(id).populate({
      path: "company",
      populate: [{ path: "companyProfileId" }],
    });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedJob = await Jobs.findByIdAndUpdate(id, req.body);
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllJobsByCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const jobs = await Jobs.find({ company: id });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const jobs = await Jobs.findByIdAndDelete(id);
    return res.status(200).send("Puna u fshi me sukses!");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getJobMatchedByCategory = async(req,res) =>{
    const{id}=req.params
    try {
        const jobs = await Jobs.find({category:id}).limit(4)
        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).send(error);

    }
}

const getJobMatchedBySkills = async(req,res) =>{
  const {id}=req.params
  try {
    const user = await User.findById(id).populate("userProfileId")
    const userSkills = user.userProfileId.skills.map(skill => skill.title)
   const jobs = await  Jobs.find({ skills : { $in : userSkills }}).populate({
    path: "company",
    select: "_id",
    populate: [
      {
        path: "companyProfileId",
        select: "industry location name size image",
      },
    ],
  });

    res.status(200).json(jobs)

  } catch (error) {
    res.status(500).send(error);
    console.log(error)
  }
}
const saveJob = async(req,res) =>{
  try {
    const savedJobs = await new SavedJobs(req.body).save()
    res.status(201).json(savedJobs)
  } catch (error) {
    res.status(500).send(error);

  }
}

const getSavedJobs = async(req,res) =>{
  const {id}= req.params
  try {
    const savedJobs = await SavedJobs.find({user:id})
    .populate({
      path: "job",
      populate: [{ path: "company",select:"companyProfileId",populate:{
        path:"companyProfileId",
        select:"name industry"
      } }],
    })
    ;
    res.status(200).json(savedJobs)

  } catch (error) {
    res.status(500).send(error);
    console.log(error,"error")

  }
}
const removeSavedJob = async(req,res) =>{
  const {id} = req.params
  try {
    const jobs = await SavedJobs.findByIdAndDelete(id)
    res.status(200).send("U hoq nga favoritet!")

  } catch (error) {
    res.status(500).send(error);

  }
}
module.exports = {
  createJob,
  getJobs,
  getFilteredJobs,
  getJob,
  updateJob,
  getAllJobsByCompany,
  deleteJob,
  getJobMatchedByCategory,
  saveJob,
  getSavedJobs,
  removeSavedJob,
  getJobMatchedBySkills
};
