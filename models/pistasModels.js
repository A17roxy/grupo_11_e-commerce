const fs = require('fs');
const path = require('path');

const model = {
    fileRoute: path.join(__dirname, '../data/products.json'),

    findAll: () => {
        const jsonData = fs.readFileSync(model.fileRoute, 'utf-8');
        // convierto JSON en javascript
        const pistas = JSON.parse(jsonData);
        return pistas;
    },

    findById: (id) => {
    }
}

module.exports = model;

