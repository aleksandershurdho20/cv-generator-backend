const express = require("express")
const { createMessage,getMessages } = require("../controllers/messages")
const router = express.Router()

router.post("/message",createMessage)
router.get("/messages/:id",getMessages)



module.exports = router