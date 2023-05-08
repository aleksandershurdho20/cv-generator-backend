const express = require("express")
const { createJob,getJobs,getFilteredJobs,getJob,updateJob,getAllJobsByCompany,deleteJob } = require('../controllers/jobs.js')

const router = express.Router()

router.post("/job/create",createJob)
router.get("/jobs",getJobs)
router.get("/jobs/search",getFilteredJobs)
router.get("/job/:id",getJob)
router.put("/job/:id",updateJob)
router.get("/jobs/company/:id",getAllJobsByCompany)
router.delete("/job/:id",deleteJob)
module.exports = router