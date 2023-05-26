const express = require('express')

const router = express.Router();
const { createConversation, getUserConversations,deleteConversation,deleteUserConversation } = require('../controllers/conversation.js');
router.post('/conversation', createConversation)
router.get("/conversation/:id",getUserConversations)
router.delete("/conversation/:id",deleteConversation)
router.post("/conversation/user/:id",deleteUserConversation)

module.exports = router