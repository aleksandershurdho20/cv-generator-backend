
const Jobs = require('../models/Job')

const createJob = async (req,res) =>{
    try {
        await new Jobs(req.body).save()
        return res.status(201).send("Job created succesfully!")
    } catch (error) {
        res.status(500).send(error)
    }
}


const getJobs = async (req,res) =>{
    try {
        const jobs = await Jobs.find({})
        return res.json({jobs})
    } catch (error) {
        res.status(500).send(error)

    }
}

const getFilteredJobs = async(req,res) =>{
    const {title,jobType} = req.query
    const test= title === "undefined"
    const second = jobType === "undefined"
    const filters = {
        ...(!test && {title:{
            $regex:title,$options:"i"
        }} ),
        ...(!second && {jobType:jobType} )
    
    }
    try {
        const jobs = await Jobs.find(filters)
        res.status(200).send({jobs})
        
    } catch (error) {
        res.status(500).send(error)

    }
}

const getJob = async (req,res) =>{
    const {id} = req.params
    try {
        const job = await Jobs.findById(id)
        res.status(200).json(job)
    } catch (error) {
        res.status(500).send(error)
    }
}

 const updateJob = async(req,res) =>{
    const {id}= req.params
    try {
        const updatedJob = await Jobs.findByIdAndUpdate(id,req.body)
        res.status(200).json(updatedJob)
    } catch (error) {
        res.status(500).send(error)

    }
}
module.exports={
    createJob,
    getJobs,
    getFilteredJobs,
    getJob,
    updateJob
}