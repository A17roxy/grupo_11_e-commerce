const path = require('path');
const albumsModels = require('../models/albumsModels');

const controller ={
    albums: (req,res) => {
        /* res.render('albums') */
        const albums = albumsModels.findAll();
        res.render('albums', { albums: albums }); // { albums } como se llama igual es lo mismo que poner { albums: albums }
    },

    getList: (req, res) => {
        albumsModels.findAll();


    }

}

module.exports = controller;
                                                                       

