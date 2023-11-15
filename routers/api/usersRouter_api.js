const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/usersController_api.js');


//Get de /api/users/usersList
router.get('/listUsers', usersController.getList);

//Get de /api/users/lastUser
router.get('/LastUser', usersController.getLast);

module.exports = router;