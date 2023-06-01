const express = require("express")
const { createProfile,getProfile,updateProfile,searchUsersByJobPosition,getUserProfile } = require("../controllers/profile")
const upload = require('../middlewares/multer')
const router = express.Router()

router.post("/profile/create",upload.single('image'),createProfile)
router.get("/profile/:id",getProfile)
router.put("/profile/:user",upload.single('image'),updateProfile)
router.post("/users/search",searchUsersByJobPosition)
router.get("/users/profile/:id",getUserProfile)

module.exports = router