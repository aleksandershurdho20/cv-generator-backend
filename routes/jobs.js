const express = require("express")
const { createJob,getJobs,getFilteredJobs,getJob,updateJob } = require('../controllers/jobs.js')

const router = express.Router()

router.post("/job/create",createJob)
router.get("/jobs",getJobs)
router.get("/jobs/search",getFilteredJobs)
router.get("/job/:id",getJob)
router.put("/job/:id",updateJob)
module.exports = router