const express = require("express")
const {applyToJob,getUserJobApplications,cancelJobApplication} = require("../controllers/applicants")
const router = express.Router()

router.post("/job/apply",applyToJob)
router.get("/applicants/:id",getUserJobApplications)
router.post("/application/cancel/:id",cancelJobApplication)

module.exports = router