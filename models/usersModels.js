const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const model = {

    fileRoute: path.join(__dirname, '../data/users.json'),

    findAll: function () {
        return JSON.parse(fs.readFileSync(model.fileRoute, 'utf-8'));
    },

    create: (userData) => {

        const emailInUse = model.findByEmail(userData.email);

        if (emailInUse) {
            return ({
                errors: {
                    email: 'Este e-mail ya está en uso',
                    password: 'Esta contraseña ya está en uso'
                }

            });
        }

        let users = JSON.parse(fs.readFileSync(model.fileRoute, 'utf-8'));

        const newUser = {
            id: uuid.v4(),
            ...userData
        };

        newUser.password = bcrypt.hashSync(newUser.password, 10);

        users.push(newUser);

        const usersJson = JSON.stringify(users);

        fs.writeFileSync(model.fileRoute, usersJson, 'utf-8');

        return newUser;
    },

    findByEmail: (email) => {
        const users = JSON.parse(fs.readFileSync(model.fileRoute, 'utf-8'));

        const coincidence = users.find(usuarioActual => usuarioActual.email === email);

        return coincidence || null;
    },
    findByField: function (field, text) {
        let users = this.findAll();
        let userFound = users.find(theUser => theUser[field] === text);
        console.log('buscando por campo ' + field);
        if (userFound != undefined) {
            console.log('usuario enconotrado: ');
        } else {
            console.log('usuario no encontrado');
        }
        return userFound;
    }
}

module.exports = model;