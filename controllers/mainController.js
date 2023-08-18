const path = require('path');

const controller ={
    home: (req,res) => {res.render('home')},
    message: (req,res) => {res.render('message', {text: "hola"})},
}

module.exports = controller;
                                                                       