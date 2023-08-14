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
        console.log(newProd); 
        
        
        const createdAlbum = albumsModels.createAlbum(newProd);

        console.log('El nuevo producto tiene como id: ' + createdAlbum.id);
        //res.redirect('/products/' + createdProduct.id + '/detail');  
         
        // Desde los POST no renderizamos vistas, solo redireccionamos.
        /* res.redirect('message?text="gracias por registrarte"&redir="/home"', {text: "Producto grabado con ID: " + createdAlbum.id}); */
        res.redirect('/albums'); 
    }

}

module.exports = controller;
                                                                       

