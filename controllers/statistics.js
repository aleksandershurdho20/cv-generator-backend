const Job = require("../models/Job");
const mongoose = require("mongoose");
const Messages = require("../models/Messages");
const Applicants = require("../models/Applicants");
const SavedJobs = require("../models/SavedJobs");

const getCompanyStats = async (req, res) => {
  const { id } = req.params;
  try {
    const totalMessages = await Messages.find({
      $or: [{ sender: id }, { receiver: id }],
    });
    const totalApplicantsInJobs = await Job.aggregate([
      { $match: { company: new mongoose.Types.ObjectId(id) } },

      { $unwind: "$applicants" },
      { $group: { _id: "$_id", sum: { $sum: 1 } } },
      { $group: { _id: null, total_applicants: { $sum: "$sum" } } },
    ]);
    const monthlyApplicants = await Job.aggregate([
      { $match: { company: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      // Latest jobs come first
    ]);

    const applicantStatuses = await Applicants.aggregate([
      {
        $lookup: {
          from: "jobs",
          localField: "job",
          foreignField: "_id",
          as: "jobData",
        },
      },
      { $match: { "jobData.company": new mongoose.Types.ObjectId(id) } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    console.log(applicantStatuses,'applicantStatuses')
    const createdJobs = await Job.find({ company: id });

    res.json({
      createdJobs: createdJobs.length,
      monthlyApplicants,
      totalApplicantsInJobs:
        totalApplicantsInJobs.length > 0
          ? totalApplicantsInJobs[0].total_applicants
          : 0,
      messages: totalMessages.length,
      applicantStatuses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getUserStats = async (req, res) => {
  const { id } = req.params;
  try {
    const userSavedJobs = await SavedJobs.find({
      user: id,
      is_saved: true,
    }).count();

    const userApplicants = await Applicants.aggregate([
      { $match: { candidate: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      // Latest jobs come first
    ]);

    const applicantStatuses = await Applicants.aggregate([
      { $match: { candidate: new mongoose.Types.ObjectId(id) } },

      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const totalJobsApply = await Applicants.find({ candidate: id }).count();
    const totalMessages = await Messages.find({
      $or: [{ sender: id }, { receiver: id }],
    }).count();

    res.json({
      totalJobsApply,
      totalMessages,
      applicantStatuses,
      userApplicants,
      userSavedJobs,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  getCompanyStats,
  getUserStats,
};
