const express = require('express');
const router = express.Router();
const usersControllerAPI = require('../../controllers/api/usersController_api.js');


//Get de /api/users/usersList
router.get('/listUsers', usersControllerAPI.getList);

//Get de /api/users/lastUser
router.get('/LastUser', usersControllerAPI.getLast);

//Get de /api/users/user
router.get('/user/:id', usersControllerAPI.getUser);

module.exports = router;