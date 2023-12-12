const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logoutUser, getUserById, getAllUser } = require('../controller/AuthController')
const { authMiddleware,permissionUser } = require('../middleware/UserMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', authMiddleware, logoutUser)
router.get('/me', authMiddleware, getUserById)
router.get('/users', getAllUser)

module.exports = router;