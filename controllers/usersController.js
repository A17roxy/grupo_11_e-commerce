const usersModels = require('../models/usersModels');
const validationResult = require('express-validator').validationResult;

const controller = {
    getList: (req, res) => {
        usersModels.findAll();
    },
    getLogin: (req, res) => {
        const error = req.query.error;

        res.render('login', { error });
    },

    getRegister: (req, res) => {
        const error = req.query.error;

        res.render('register', { error });
    },

    login: (req, res) => {
        const userInJson = usersModels.findByEmail(req.body.email);

        // Si no encuentra el mail redirecciona
        if (!userInJson) {
            return res.redirect('/users/login?error=El mail o la contraseña son incorrectos');
        }
        const validPw = bcrypt.compareSync(req.body.password, userInJson.password);

        //Si es una contraseña es válida
        if (validPw) {
            if(req.body.remember === 'on'){
            
                res.cookie('email', userInJson.email, { maxAge: 1000 * 60 * 60 * 24 * 365});
            } else {
                console.log('No se mantendra la sesión iniciada');
            }

            req.session.user = userInJson;

            res.redirect('/');
        } else {
            res.redirect('/users/login?error=Datos de usuario incorrectos');
        }
    },

    register: (req, res) => {
        const xValid = validationResult(req);
        if (xValid.errors && xValid.errors.length != 0){
            console.log(xValid.errors);
            res.render('register', { errorExpress: xValid.errors });
            return;
        }
        const newUser = {
            lastname:req.body.lastname ,
            firstname:req.body.firstname ,
            email: req.body.email ,
            password: req.body.password ,
            category: "User" //user puesto a mano, todos los que se mueven por ahora son usuarios externos
        }
        newUser.image = "images/users/"+req.file.filename;
        const user = usersModels.create(newUser);

  
        
        if (user.errors) {
            res.render('register', { errors: user.errors });
        } else {
            res.redirect('/users/register-thank-you?mensaje='+user.firstname);
        }
    },

    thankYouForRegister: (req,res) => {
        const mensaje = req.query.mensaje; 
        res.render('register-thank-you', { mensaje });
    }, 
}


module.exports = controller;