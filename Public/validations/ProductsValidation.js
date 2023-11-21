const { body } = require('express-validator');

const productValidation = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres.'),

    body('description')
        .notEmpty().withMessage('La descripción es obligatoria.')
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres.'),

    body('image')
        .notEmpty().withMessage('La imagen es obligatoria.')
        .custom(value => isImageFile(value)).withMessage('La imagen debe ser un archivo válido (JPG, JPEG, PNG, GIF).'),

    
];

function isImageFile(value) {
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const extension = value.substring(value.lastIndexOf('.')).toLowerCase();
    return imageExtensions.includes(extension);
}

module.exports = {
    productValidation,
};
