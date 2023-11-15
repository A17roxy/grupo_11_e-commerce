const { check } = require('express-validator');

function productValidation(req, res, next) {
    const { name, description } = req.body;

    req.check('name', 'El nombre es obligatorio y debe tener al menos 5 caracteres.').notEmpty().isLength({ min: 5 });
    req.check('description', 'La descripción es obligatoria y debe tener al menos 20 caracteres.').notEmpty().isLength({ min: 20 });
    req.check('image', 'La imagen es obligatoria y debe ser un archivo válido (JPG, JPEG, PNG, GIF).').notEmpty().isImageFile();

    handleValidationResult(req, res, next);
}

function handleValidationResult(req, res, next) {
    const errors = req.validationErrors();
    if (errors) {
        return res.render('productsForm', { errors, ...req.body });
    }
    next();
}

module.exports = {
    productValidation,
    handleValidationResult,
};
