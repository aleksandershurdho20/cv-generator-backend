const User = require('../models/User.js')
const Job = require("../models/Job")
const Applicants = require("../models/Applicants")

const applyToJob = async(req,res) =>{
    try {
        // const hasApplied = Applicants.collection.getIndexes()

        const job = await Job.findById(req.body.job)

        const hasUserApply = job.applicants.includes(req.body.candidate)

        // const test = await Job.aggregate([
        //     {
        //         $lookup: {
        //             from: "Applicants",
        //             pipeline: [
        //                 { $project: {candidate: 1}}
        //             ],
        //             as: "roleDescription"
        //         }
        //     }
        // ])

        if(hasUserApply){
            return res.status(400).send("Aplikimi mund te kryhet vetem njehere!");
        }
        // .find({
        //     $match: { _id: ObjectId(req.body.candidate) }

        // })
        // find({candidate : {$in : [req.body.job,req.body.candidate]    )
        // console.log(hasApplied,'hasApplied')
    //     if(hasApplied){
    //    return res.status(400).send("Aplikimi mund te kryhet vetem njehere!");
    //     }
        const jobs = await new Applicants({
            job:req.body.job,
            candidate:[req.body.candidate],
            is_confirmed:req.body.is_confirmed
        }).save()

        await Job.findByIdAndUpdate(req.body.job, {
            $inc: { numberOfApplications: 1 },
            $push:{
                applicants:req.body.candidate
            }
          });

          res.status(201).json(jobs)

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


const getUserJobApplications = async(req,res) =>{
    const {id}=req.params
    try {
        const applicants = await Applicants.find({candidate:id}).populate("job")
        res.status(200).json(applicants)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}


const cancelJobApplication = async(req,res) =>{
    const {id}=req.params
    try {
        const allJobs = await Applicants.findByIdAndUpdate(id,{
            is_confirmed:false
        }
       )
        await Job.findByIdAndUpdate(req.body.job, {
            $inc: { numberOfApplications: -1 },
            $pull:{
                applicants:req.body.candidate
            }
          });
          res.status(200).json(allJobs)
    } catch (error) {
        res.status(500).send(error)

    }
}
module.exports ={
    applyToJob,
    getUserJobApplications,
    cancelJobApplication
}