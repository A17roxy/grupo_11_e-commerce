const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/albumsController.js');

/* www.url.com/albums */
router.get('/',albumsController.albums);


module.exports = router ;