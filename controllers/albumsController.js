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

        res.send('Estás viendo el detalle del producto ' + productId);
    }

}

module.exports = controller;
                                                                       

