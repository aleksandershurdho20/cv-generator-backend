
const express = require("express")
const { getCompanyStats } = require("../controllers/statistics")
const router = express.Router()

router.get("/statistics/company/:id",getCompanyStats)

module.exports = router