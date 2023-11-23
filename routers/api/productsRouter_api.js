const express = require('express');
const router = express.Router();
const productsControllerAPI = require('../../controllers/api/productsController_api.js');


//Get de /api/users/usersList
router.get('/listProducts', productsControllerAPI.getList);

//Get de /api/users/user
router.get('/product/:id', productsControllerAPI.getProduct);

module.exports = router;