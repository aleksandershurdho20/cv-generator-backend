const express = require("express")
const { createProfile,getProfile } = require("../controllers/profile")
const router = express.Router()

router.post("/profile/create",createProfile)
router.get("/profile/:id",getProfile)

module.exports = router