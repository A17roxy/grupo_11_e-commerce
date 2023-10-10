const express = require('express');
const multer = require('multer');
const router = express.Router();
const albumsController = require('../controllers/albumsController.js');
const albumMiddleware = require('../middlewares/albumMiddleware.js');
const controller = require('../controllers/albumsController.js');

// Inicializo storage de multer, con el destination y formato de filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/products');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

/* www.url.com/albums (Lista de Albums) */
router.get('/', albumMiddleware, albumsController.albums);

// @GET - /albums/:id/detail
/* router.get('/:id/detail', albumsController.getDetail); */

// @GET - /albums/:id/edit
router.get('/:id/edit', albumsController.albumEdit);

// @GET - /albums/create
router.get('/create', albumsController.getCreate);

// @POST - /albums // agregué acá el upload.single para que multer pueda enviar imagenes al server
//router.post('/', upload.single('productImage'), albumsController.postProduct);

// @PUT - / albums/:id/edit
//router.put('/:id/edit',  albumsController.updateAlbum);

//router.put('/:id/edit', albumsController.updateAlbum);

/* // @DELETE - /products/:id/delete
router.delete('/:id/delete', albumsController.deleteProduct); */

// @GET - /albums/:id/detail
router.get('/:id/detail', albumsController.albumDetail);

// @POST - /albums
router.post('/', upload.single('productImage'), albumsController.createOne);

// @PUT - /albums/:id/edit
router.put('/:id/edit', upload.single('productImage'), albumsController.editOne);

// @DELETE - /albums/:id/delete
router.delete('/:id/delete', albumsController.deleteOne)

module.exports = router ;