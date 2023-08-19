const path = require('path');

const controller = {
    home: (req, res) => {
        res.render('home', { user: req.session.user });
    },
    message: (req, res) => { res.render('message', { text: "hola" }) },
}

module.exports = controller;
