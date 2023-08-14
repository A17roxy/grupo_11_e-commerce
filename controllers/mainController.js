const path = require('path');

const controller ={
    home: (req,res) => {res.render('home')},
    login: (req,res) => {res.render('login')},
    register: (req,res) => {res.render('register')},
    message: (req,res) => {res.render('message', {text: "hola"})},
}

module.exports = controller;
                                                                       