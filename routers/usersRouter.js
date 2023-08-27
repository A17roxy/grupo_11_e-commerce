const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

const multer = require('multer');


// Inicializo storage de multer, con el destination y formato de filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/users');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });


//Get de /users/usersList
router.get('/usersList', usersController.getList);


//Get de /users/register
router.get('/login',usersController.getLogin);

//Post de /users/login
router.post('/login', usersController.login);


//Get de /users/register
router.get('/register',usersController.getRegister);

//Post de /users/register
//el nombre del objeto parametro de upload.single tiene que ser IGUAL al name del campo input de la imagen en el form
router.post('/register', upload.single('userImage'), usersController.register);

//Get del /users/register-thank-you
router.get('/register-thank-you',usersController.thankYouForRegister);

module.exports = router;