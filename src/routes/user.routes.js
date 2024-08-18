const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userMiddleware.authenticate, userController.profile);
router.put('/profile', userMiddleware.authenticate, userController.updateProfile);

module.exports = router;
