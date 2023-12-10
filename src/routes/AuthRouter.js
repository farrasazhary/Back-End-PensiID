const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logoutUser } = require('../controller/AuthController')
const { authMiddleware,permissionUser } = require('../middleware/UserMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', authMiddleware, logoutUser)

module.exports = router;