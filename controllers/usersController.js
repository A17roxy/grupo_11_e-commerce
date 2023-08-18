const usersModel = require('../models/usersModels');

const controller = {
    getList: (req, res) => {
        usersModel.findAll();
    },
    login: (req,res) => {res.render('login')},
    register: (req,res) => {res.render('register')},
}

module.exports = controller;