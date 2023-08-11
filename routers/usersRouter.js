const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// @GET /products
router.get('/users', usersController.getList);

module.exports = router;