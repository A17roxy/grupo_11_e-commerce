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
        console.log(req.body);

        const newProduct = {
            title: req.body.title,
            price: req.body.price
        }

        const createdProduct = productModel.createProduct(newProduct);

        console.log('El nuevo producto tiene como id: ' + createdProduct.id);
        res.redirect('/products/' + createdProduct.id + '/detail');
        
        // Desde los POST no renderizamos vistas, solo redireccionamos.
        // res.redirect('/products');
    }

}

module.exports = controller;
                                                                       

