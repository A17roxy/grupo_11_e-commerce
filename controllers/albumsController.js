const path = require('path');
const bodyParser = require('body-parser')
//const albumsModels = require('../models/albumsModels');


const db = require('../database/models/index.js');
const initModels = require('../database/models/init-models');
const models = initModels(db.sequelize);
const { products, genres } = models;



const controller = {
    albums: async function (req, res) {
        try {
            const albums = await products.findAll({ raw: true });
            res.render('albums', { albums: albums }); // { albums } como se llama igual es lo mismo que poner { albums: albums }
        } catch (error) {
            console.error(error);
            throw new Error('Error al traer albums');
        }
    },

    albumEdit: async (req, res) => {
        const productId = req.params.id;
        try {
            //const album = await products.findByPk(productId, { raw: true });
            //const genres = await genres.findAll({ raw: true}); //es lo mismo que el query select *
            // ESTOS DOS LINEAS DE ARRIBA ES LO MISMO QUE ESTO DE ABAJO
            const { QueryTypes } = require('sequelize');
            const album = await db.sequelize.query("SELECT a.*,b.genre from products a left join genres b on a.id_genre=b.id where a.id=" + productId, { type: QueryTypes.SELECT });
            const genres = await db.sequelize.query("select * from genres", { type: QueryTypes.SELECT });
            res.render('editAlbum', { products: album[0], genres: genres });
        } catch (error) {
            console.log(error);
        }
    },

    getCreate: async (req, res) => {
        try {
            const albums = await products.findAll({ raw: true });
            const generos = await genres.findAll({ raw: true}); 
            res.render('createAlbum', { products: albums, genres: generos});
        } catch (error) {
            console.log(error);
        }
    },

    postProduct: (req, res) => {
        //console.log(req.file);
        // console.log('---------------')
        //console.log(req.body);
        const newProd = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
        newProd.image = "images/products/" + req.file.filename
        const createdAlbum = albumsModels.createAlbum(newProd);
        console.log('El nuevo producto tiene como id: ' + createdAlbum.id);
        //res.redirect('/products/' + createdProduct.id + '/detail');  
        // Desde los POST no renderizamos vistas, solo redireccionamos.
        /* res.redirect('message?text="gracias por registrarte"&redir="/home"', {text: "Producto grabado con ID: " + createdAlbum.id}); */
        res.redirect('/albums');
    },

    updateAlbum: async (req, res) => {
        try {
            const updatedBody = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
            updatedBody.image = "images/products/" + req.file.filename

            let updatedProduct = {
                id: Number(req.params.id)
            };

            updatedProduct = {
                ...updatedProduct,
                ...updatedBody
            };

            console.log("zzzzzzzz" +updatedProduct);

            await products.update(
                {
                    title: updatedBody.title,
                    artist: updatedBody.artist,
                    year: updatedBody.year
                },
                { where: req.params.id }
            )
            res.redirect('/');

        } 
        catch 
        {


        }
        /* 
          const updatedProduct = req.body;
          updatedProduct.id = Number(req.params.id); 
        */
        //albumsModels.updateProduct(updatedProduct);

    },

    /*  deleteProduct: (req, res) => {
         albumsModels.destroy(Number(req.params.id));
 
         res.redirect('/albums');
     }, */


    albumDetail: async (req, res) => {
        try {
            const album = await album.findByPk(req.params.id, { raw: true });

            res.render('albumDetail', { album });

        } catch (error) {
            console.log(error);
        }
    },

    createOne: async (req, res) => {
        const bodyData = JSON.parse(JSON.stringify(req.body)); 
        bodyData.image = "images/products/" + req.file.filename
        console.log("creando album");
        console.log(bodyData);
        const nuevoAlbum = {
            title: bodyData.title,
            artist: bodyData.artist,
            id_genre: bodyData.id_genre,
            year: bodyData.year,
            price: bodyData.price,
            image: bodyData.image,
            type: "Album",
        };

        try {
            const newAlbum = await products.create(nuevoAlbum);
            console.log(newAlbum);
            //return res.redirect('/albums/' + newAlbum.dataValues.id + '/detail')
            
        } catch (error) {
            console.log(error);
        }
        return res.redirect('/albums')
    },

    editOne: async (req, res) => {
        const nueBody = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
        nueBody.image = "images/products/" + req.file.filename
        const id = req.params.id;
        const updatedAlbum = {
            title: nueBody.title,
            artist: nueBody.artist,
            id_genre: nueBody.id_genre,
            year: nueBody.year,
            price: nueBody.price,
        };
        try {
            await products.update(updatedAlbum, {
                where: {
                    id: req.params.id
                }
            })
        } catch (error) {
            console.log(error);
        }
        res.redirect('/albums');
    },

    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            await products.destroy({
                where: {
                    id: req.params.id
                }
            })
        } 
        catch (error) 
        {
            console.log(error);
        }

        res.redirect('/albums')
    }

}

module.exports = controller;


