const fs = require('fs');
const path = require('path');

const model = {
    findAll: () => {
        // Buscamos el contenido del archivo JSON.
        const jsonData = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
        // Convertimos el JSON en Javascript.
        const products = JSON.parse(jsonData);

        return products;
    },

    findById: (id) => {
        const products = model.findAll();

        const selectedProduct = products.find(productoActual => productoActual.id == id);

        return selectedProduct;
    }
}

module.exports = model;
