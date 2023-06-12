const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUser, searchUser, inviteUser, getNotifications} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/search', protect,searchUser)
router.post('/invite',protect, inviteUser)
router.get('/me', protect, getUser)
router.get('/:id/notifications', protect, getNotifications)

module.exports = router
