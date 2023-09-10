const rememberMiddleware = require('../middlewares/rememberMiddleware');
const usersModels = require('../models/usersModels');
const validationResult = require('express-validator').validationResult;
const bcrypt = require('bcrypt');

const controller = {
    getList: (req, res) => {
        usersModels.findAll();
    },
    getLogin: [rememberMiddleware, (req, res) => {

        if (req.session.user != undefined) {
            res.redirect('profile');
        } else {

            const error = req.query.error;

            res.render('login', { error });
        }
    }],

    getRegister: (req, res) => {
        const error = req.query.error;

        res.render('register', { error });
    },

    loginProcess: (req, res) => {

        console.log('inicio login process');
        console.log(req.body);

        let userIndB = usersModels.findByField('email', req.body.email);

        if (userIndB) {
            console.log('encontre el usuario');
            let passCheck = bcrypt.compareSync(req.body.password, userIndB.password);

            if (passCheck) {
                console.log('password valido');

                if (req.body.remember === 'on') {
                    res.cookie('remember', userIndB, { maxAge: 1000 * 60 * 60 * 24 * 365 });
                    console.log('recordar usuario activado');
                } else {
                    console.log('No se mantendra la sesión iniciada');
                }

                req.session.user = userIndB;
                req.session.loggedFirstName = userIndB.firstname;

                console.log('El usuario logeado es : ' + req.session.loggedFirstName);

                return res.redirect('/');
            }

            return res.render('login', {
                errors: {
                    password: { msg: 'Credenciales invalidas' }
                }
            });
        }

        return res.render('login', {
            errors: {
                email: { msg: 'Credenciales invalidas' }
            }
        });

    },

    logout: function (req, res) {
        res.clearCookie('remember');
        req.session.user = undefined;
        req.session.loggedFirstName = undefined;
        console.log("cierro sesion de usuario");
        return res.render('logout');
    },

    userprofile: function (req, res) {

        let userData = req.session.user;

        return res.render('profile', { user: userData });

    },

    register: (req, res) => {
        const xValid = validationResult(req);
        if (xValid.errors && xValid.errors.length != 0) {
            console.log(xValid.errors);
            res.render('register', { errorExpress: xValid.errors });
            return;
        }
        const newUser = {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            email: req.body.email,
            password: req.body.password,
            category: "User" //user puesto a mano, todos los que se mueven por ahora son usuarios externos
        }
        newUser.image = "images/users/" + req.file.filename;
        const user = usersModels.create(newUser);



        if (user.errors) {
            res.render('register', { errors: user.errors });
        } else {
            res.redirect('/users/register-thank-you?mensaje=' + user.firstname);
        }
    },

    thankYouForRegister: (req, res) => {
        const mensaje = req.query.mensaje;
        res.render('register-thank-you', { mensaje });
    },
}


module.exports = controller;