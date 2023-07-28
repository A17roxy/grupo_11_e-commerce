const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/albumsController.js');

/* www.url.com/clientes ->  clientes viene el app.use en app.js*/
router.get('/',albumsController.albums);

module.exports = router ;