const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js');

router.get('/',mainController.home);
router.get('/message/:text', mainController.message);


module.exports = router ;