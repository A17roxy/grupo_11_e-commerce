const path = require('path');
const bodyParser = require('body-parser')
const albumsModels = require('../models/albumsModels');

const controller ={
    albums: (req,res) => {
        const albums = albumsModels.findAll();
        res.render('albums', { albums: albums }); // { albums } como se llama igual es lo mismo que poner { albums: albums }
    },

    albumEdit: (req, res) => {
        const productId = req.params.id;
        const selectedProduct = albumsModels.findById(productId);
        res.render('editAlbum', { products: selectedProduct });
    },


    getEdit: (req, res) => {
        const productId = req.params.id;
        const selectedProduct = albumsModels.findById(productId);
        res.render('editAlbum', { products: selectedProduct });
    },

    getCreate: (req, res) => {
        res.render('createAlbum');
    },

    postProduct: (req, res) => {

         console.log(req.file);
        // console.log('---------------')
        console.log(req.body);

        const newProd = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
        newProd.image = "images/products/"+req.file.filename
     
        const createdAlbum = albumsModels.createAlbum(newProd);

        console.log('El nuevo producto tiene como id: ' + createdAlbum.id);
        //res.redirect('/products/' + createdProduct.id + '/detail');  
         
        // Desde los POST no renderizamos vistas, solo redireccionamos.
        /* res.redirect('message?text="gracias por registrarte"&redir="/home"', {text: "Producto grabado con ID: " + createdAlbum.id}); */
        res.redirect('/albums'); 
    },

    updateAlbum: (req, res) => {

        const updatedBody = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
        updatedBody.image = "images/products/"+req.file.filename

        let updatedProduct = {
            id: Number(req.params.id)
        };


        updatedProduct = {
            ...updatedProduct,
            ...updatedBody
        };

        /* 
            const updatedProduct = req.body;
            updatedProduct.id = Number(req.params.id); 
        */

        albumsModels.updateProduct(updatedProduct);

        res.redirect('/');
    },

    deleteProduct: (req, res) => {
        productModel.destroy(Number(req.params.id));

        res.redirect('/products');
    }

}

module.exports = controller;
                                                                       

