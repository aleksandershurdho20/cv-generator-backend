
const express = require("express")
const { getCompanyStats,getUserStats } = require("../controllers/statistics")
const router = express.Router()

router.get("/statistics/company/:id",getCompanyStats)
router.get("/statistics/user/:id",getUserStats)

module.exports = router