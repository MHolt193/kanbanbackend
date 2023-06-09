const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUser, searchUser} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/search', searchUser)
router.get('/me', protect, getUser)

module.exports = router
