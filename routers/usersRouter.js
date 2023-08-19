const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


//Get de /users/usersList
router.get('/usersList', usersController.getList);


//Get de /users/register
router.get('/login',usersController.getLogin);

//Post de /users/login
router.post('/login', usersController.login);


//Get de /users/register
router.get('/register',usersController.getRegister);
//Post de /users/register
router.post('/register', usersController.register);




module.exports = router;