const express = require("express")
const { createProfile,getProfile,updateProfile } = require("../controllers/profile")
const router = express.Router()

router.post("/profile/create",createProfile)
router.get("/profile/:id",getProfile)
router.put("/profile/:user",updateProfile)
module.exports = router