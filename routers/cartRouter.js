const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController.js');
const carritoMiddleware = require('../middlewares/carritoMiddleware.js');

/* www.url.com/cart -> "cart" ya está vienendo en el url al estar en app.use en app.js (seria como la raiz)*/
router.get('/', carritoMiddleware, cartController.cart);

module.exports = router ;
