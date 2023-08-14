const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js');

router.get('/',mainController.home);
router.get('/message/:text', mainController.message);
router.get('/login',mainController.login);
router.get('/register',mainController.register);

module.exports = router ;