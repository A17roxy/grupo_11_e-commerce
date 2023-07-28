const express = require('express');
const router = express.Router();
const pistasController = require('../controllers/pistasController.js');

/* www.url.com/clientes ->  clientes viene el app.use en app.js*/
router.get('/',pistasController.pistas);

module.exports = router ;