const fs = require('fs');
const path = require('path');

const model = {
    fileRoute: path.join(__dirname, '../data/products.json'),

    findAll: () => {
        // Buscamos el contenido del archivo JSON.
        const jsonData = fs.readFileSync(model.fileRoute, 'utf-8');
        // Convertimos el JSON en Javascript.
        const products = JSON.parse(jsonData);

        return products;
    },

    findById: (id) => {
        const products = model.findAll();

        const selectedProduct = products.find(productoActual => productoActual.id == id);


        return selectedProduct;
    },

    createProduct: (newProduct) => {
        const products = model.findAll();

        const lastProdId = products[products.length - 1].id;

        const newProduct = {
            id: lastProdId + 1,
            ...bodyData
        }

        products.push(newProduct);

        const jsonData = JSON.stringify(products);

        fs.writeFileSync(model.fileRoute, jsonData, 'utf-8');

        return newProduct;
    }
}

module.exports = model;
