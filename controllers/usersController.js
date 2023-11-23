const rememberMiddleware = require('../middlewares/rememberMiddleware');
const usersModels = require('../models/usersModels');
const validationResult = require('express-validator').validationResult;
const bcrypt = require('bcrypt');

const controller = {
    getList: async (req, res) => {
        try {
            const users = await usersModels.findAll();
            //res.render('userList', { users }); 
        } catch (error) {
            console.error(error);
            //res.status(500).send('Error interno del servidor');
        }
    },

    getLogin: (req, res) => {

        if (req.session.user != undefined) {
            res.redirect('profile');
        } else {

            const error = req.query.error;

            res.render('login', { error });
        }
    },

    getRegister: (req, res) => {
        const error = req.query.error;

        res.render('register', { error });
    },

    loginProcess: async (req, res) => {
        console.log('Inicio de proceso de login');
        //console.log(req.body);
        try {

            const userInDb = await usersModels.findByField('email', req.body.email);

            if (userInDb) {
                const passCheck = bcrypt.compareSync(req.body.password, userInDb.password);
                if (passCheck) {
                    console.log('password valido');

                    if (req.body.remember === 'on') {
                        res.cookie('remember', userInDb, { maxAge: 1000 * 60 * 60 * 24 * 365 });
                        console.log('recordar usuario activado');
                    } else {
                        console.log('No se mantendrá la sesión iniciada');
                    }

                    req.session.user = userInDb;
                    req.session.loggedFirstName = userInDb.firstname;
                    

                    console.log('El usuario logeado es : ' + req.session.loggedFirstName);
                    return res.redirect('/');
                }
            }
            return res.render('login', {
                errors: {
                    password: { msg: 'Credenciales inválidas' }
                }
            });
        } catch (error) {
            console.error(error);
            //res.status(500).send('Error del servidor');
        }
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
    confirm_delete: (req, res) => {
        res.render('confirm_delete');
    },
    delete: async function (req, res) {
        try {
            const userEmail = req.session.user.email;
            const deletionResult = await usersModels.deleteUserByEmail(userEmail);

            if (!deletionResult.success) {
                return res.render('delete_account', { error: deletionResult.error });
            }

            req.session.destroy();
            return res.redirect('/');
        } catch (error) {
            console.error(error);
            return res.render('delete_account', { error });
        }
    },
    update: async function (req, res) {
        try {
            if (req.method === 'GET') {
                return res.render('edit_profile', { user: req.session.user });
            }
            if (req.method === 'POST') {
                const userId = req.session.user.id;
                console.log(userId);
                console.log(req.session.user);

                let filename;
                if (req.file) {
                    filename = req.file.filename;
                    console.log("hay nueva imagen "+filename);
                } else {
                    console.log("No se actualiza la imagen");
                    filename = req.session.user.image.split('/').pop();
                }

                console.log(req.body);

                let userData = {
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                    email: req.body.email,
                    password: req.body.password,
                    category: "User",
                    image: "images/users/" + filename
                };

                console.log(userData);

                const updateSuccess = await usersModels.update(userId, userData);

                if (updateSuccess) {
                    req.session.user = { ...req.session.user, ...userData };
                    return res.redirect('/users/profile');
                } else {
                    return res.redirect('/users/edit_profile?error=update_failed');
                }
            }
        } catch (error) {
            console.error(error);
            return res.render('edit_profile', {
                error: 'ocurrio un error al actualzar los datos',
                user: req.session.user
            });
        }
    },

    register: async (req, res) => {
        try {
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
                category: "User",
                image: "images/users/" + req.file.filename
            };

            const result = await usersModels.create(newUser);
            console.log("creando usuario en la db");

            if (result.error) {
                throw new Error(result.message);
            }

            res.redirect('/users/register-thank-you?mensaje=' + result.user.firstname);

        } catch (error) {
            console.error(error);
            res.render('register', { errors: [{ msg: error.message }] });
        }
    },

    thankYouForRegister: (req, res) => {
        const mensaje = req.query.mensaje;
        res.render('register-thank-you', { mensaje });
    },

    cartWithoutAccess: (req, res) => {
        const mensaje = req.query.mensaje;
        res.render('cart-error-whitout-access', { mensaje });
    },

    albumWithoutAccess: (req, res) => {
        const mensaje = req.query.mensaje;
        res.render('album-error-whitout-access', { mensaje });
    }
}


module.exports = controller;