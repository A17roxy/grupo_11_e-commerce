const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/albumsController.js');

/* www.url.com/albums */
router.get('/',albumsController.albums);

// @GET - /products/:id/detail
router.get('/:id/detail', productsController.getDetail);


module.exports = router;