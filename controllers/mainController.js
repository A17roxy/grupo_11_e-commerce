const path = require('path');

const controller ={
    home: (req,res) => {res.render('home')},
    login: (req,res) => {res.render('login1')},
    register: (req,res) => {res.render('register')},
}

module.exports = controller;
                                                                       