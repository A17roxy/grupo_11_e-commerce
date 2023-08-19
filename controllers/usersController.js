const usersModel = require('../models/usersModels');

const controller = {
    getList: (req, res) => {
        usersModel.findAll();
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
        const userInJson = userModel.findByEmail(req.body.email);

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
//PREGUNTAR COMO PONER VARIAS OPCIONES EN UNA CATEGORIA DE REGISTER
    register: (req, res) => {
        const newUser = {
            nombreYApellido:req.body.nombreYApellido,
            nombreDeUsuario:req.body.nombreDeUsuario,
            email: req.body.email,
            fechaDeNacimiento:req.body.fechaDeNacimiento,
            password: req.body.password,
        }

        const user = userModel.create(newUser);

        if (user.error) {
            res.redirect('/users/register?error=' + user.error);
        } else {
            res.redirect('/');
        }
    },
}


module.exports = controller;