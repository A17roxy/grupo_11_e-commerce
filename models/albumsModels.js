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
    }
}

module.exports = model;
