const express = require('express');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const albumsController = require('../controllers/albumsController.js');
const albumMiddleware = require('../middlewares/albumMiddleware.js');

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

// Reglas de validación para el formulario de creación y edición
const productValidationRules = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres.'),

    body('description')
        .notEmpty().withMessage('La descripción es obligatoria.')
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres.')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const errorMessages = errors.array().map(error => ({ param: error.param, msg: error.msg }));
    res.status(400).json({ errors: errorMessages });
};

// Lista de Albums
router.get('/', albumMiddleware, albumsController.albums);

// Editar Album
router.get('/:id/edit', albumsController.albumEdit);

// Crear Album
router.get('/create', albumsController.getCreate);

// Detalle del Album
router.get('/:id/detail', albumsController.albumDetail);

// Crear un nuevo Album
router.post('/', /* productValidationRules, validate, */ upload.single('productImage'), albumsController.createOne);

// Editar un Album existente
router.put('/:id/edit', /* productValidationRules, validate, */ upload.single('productImage'), albumsController.editOne);

// Eliminar un Album
router.delete('/:id/delete', albumsController.deleteOne);

module.exports = router;
