const express = require("express")
const {applyToJob,getUserJobApplications,cancelJobApplication,getAllCompanyJobApplications,getApplicant,rejectApplicant} = require("../controllers/applicants")
const router = express.Router()

router.post("/job/apply",applyToJob)
router.get("/applicants/:id",getUserJobApplications)
router.post("/application/cancel/:id",cancelJobApplication)
router.get("/company/:id/applicants",getAllCompanyJobApplications)
router.get("/applicant/:id",getApplicant)
router.put("/reject/applicant/:id",rejectApplicant)


module.exports = router