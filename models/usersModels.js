const fs = require('fs');
const path = require('path');

const model = [
    findAll: () => {
        const jsonData = fs.readFileSync(path.join(__dirname, '../data/users.json'));
    },

    findById: (id) => {

    }
]


module.exports = model;