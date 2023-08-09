const path = require('path');
const albumsModels = require('../models/albumsModels');

const controller ={
    albums: (req,res) => {res.render('albums')},

    getList: (req, res) => {
        albumsModels.findAll();


    }

}

module.exports = controller;
                                                                       

