const express = require('express');
const router = express.Router();
const pruebasController = require('../controllers/pruebasController.js');

/* www.url.com/pruebas ->  clientes viene el app.use en app.js*/
router.get('/matias',pruebasController.matias);
router.get('/agustin',pruebasController.agustin);
router.get('/fran',pruebasController.fran);
router.get('/ana',pruebasController.ana);

module.exports = router ;