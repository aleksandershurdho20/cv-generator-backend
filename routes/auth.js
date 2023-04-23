const express = require('express')

const router = express.Router();
const { register, login } = require('../controllers/auth.js');
const { verifyToken } = require('../middlewares/auth.js');
router.post('/register', register)
router.post('/login', login)
router.get("/profile",verifyToken)

module.exports = router