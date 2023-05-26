const express = require("express")
const { createMessage,getMessages,getMessagesByConversation } = require("../controllers/messages")
const router = express.Router()

router.post("/message",createMessage)
router.get("/messages/:id",getMessages)
router.get("/messages/conversation/:id",getMessagesByConversation)


module.exports = router