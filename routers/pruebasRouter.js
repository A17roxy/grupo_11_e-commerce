const express = require('express');
const router = express.Router();
const pruebasController = require('../controllers/pruebasController.js');

/* www.url.com/pruebas ->  clientes viene el app.use en app.js*/
router.get('/',pruebasController.home);

module.exports = router ;