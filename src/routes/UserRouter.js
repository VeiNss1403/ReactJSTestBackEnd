const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

router.post('/sign-up', UserController.createUser);
router.post('/sign-in', UserController.loginUser);
router.post('/log-out', UserController.logoutUser);
router.put('/update-user/:id', authMiddleware, UserController.updateUser);
router.delete('/delete-user/:id', authMiddleware, UserController.deleteUser);
router.get('/getAllUser', authMiddleware, UserController.getAllUser);
router.get('/get-detail/:id', authUserMiddleware, UserController.getUserDetail);
router.post('/refresh-token', UserController.refreshToken);

module.exports = router;