const path = require('path');
const albumsModels = require('../models/albumsModels');

const controller ={
    // albums: (req,res) => {res.render('albums')},

    getList: (req, res) => {
        const products = albumsModels.findAll();

        res.render('productList', { products });
    },

    getDetail: (req, res) => {
        const productId = req.params.id;

        const selectedProduct = productModel.findById(productId);

        res.send('albumsDetails', { products: selectedProduct });
    },

    getCreate: (req, res) => {
        res.render('createAlbum');
    },

    postProduct: (req, res) => {
        res.render('Se está creando eel producto...');
    }

}

module.exports = controller;
                                                                       

