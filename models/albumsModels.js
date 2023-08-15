const fs = require('fs');
const path = require('path');

const model = {
    fileRoute: path.join(__dirname, '../data/products.json'),

    findAll: () => {
        const jsonData = fs.readFileSync(model.fileRoute, 'utf-8');
        // convierto JSON en javascript
        const albums = JSON.parse(jsonData);
        return albums;
    },

    findById: (id) => {
        const products = model.findAll();
        const selectedProduct = products.find(productoActual => productoActual.id == id);
        return selectedProduct;
    },


    createAlbum: (bodyData) => {
 
        let products = model.findAll();
 
        const lastProdId = products[products.length - 1].id;
 
        let newProduct = {
             id: lastProdId + 1, 
            ...bodyData
        };
       
        products.push(newProduct);

        // Convertimos el Javascript en JSON
        const jsonData = JSON.stringify(products);

        fs.writeFileSync(model.fileRoute, jsonData, 'utf-8');

        return newProduct;
    },

    updateProduct: (updatedProduct) => {
        // Buscar array de productos ya existentes
        let products = model.findAll();
        // Conseguir en qué indice de ese array, está guardado el producto del id en cuestión
        const prodIndex = products.findIndex(productoActual => productoActual.id === updatedProduct.id);
        // Modificar el elemento del array en ese índice, por el que nos pasaron por parámetro
        products[prodIndex] = updatedProduct;
        // Convertir este nuevo array en JSON
        const productsJson = JSON.stringify(products);
        // Guardar todo al JSON
        fs.writeFileSync(model.fileRoute, productsJson, 'utf-8');
    },

    destroy: (id) => {
        let products = model.findAll();

        products = products.filter(productoActual => productoActual.id !== id);

        const jsonProducts = JSON.stringify(products);

        fs.writeFileSync(model.fileRoute, jsonProducts, 'utf-8');
    },
}

module.exports = model;
