const fs = require('fs');
const path = require('path');

const model = {
    findAll: () => {
        // Buscamos el contenido del archivo JSON
        const jsonData = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
        // Convertimos el JSON en Javascript
        const users = JSON.parse(jsonData);

        return users;
    },

    findById: (id) => {

    }
}


module.exports = model;