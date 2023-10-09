const uuid = require('uuid');
const bcrypt = require('bcrypt');

const db = require('../database/models/index.js');
const initModels = require('../database/models/init-models');
const models = initModels(db.sequelize); 
const { users } = models

const model = {

    findAll: async function () {
        try {
            return await users.findAll();
        } catch (error) {
            console.error(error);
            throw new Error('Error al recuperar usuarios');
        }
    },
    create: async (userData) => {
        try {
            const emailInUse = await model.findByEmail(userData.email);
            if (emailInUse) {
                return { error: true, message: 'Este e-mail ya está en uso' };
            }

            userData.password = bcrypt.hashSync(userData.password, 10);

            const newUser = await users.create({id: uuid.v4(), ...userData});

            //return newUser;
            return { error: false, user: newUser };

        } catch (error) {
            console.error(error);
            return { error: true, message: error.message };
        }
    },

    findByEmail: async (email) => {
        try {
            return await users.findOne({ where: { email } });
        } catch (error) {
            console.error(error);
            throw new Error('Error al buscar usuario por correo electrónico');
        }
    },
    findByField: async function (field, text) {
        try {
            return await users.findOne({ where: { [field]: text } });
        } catch (error) {
            console.error(error);
            throw new Error('Error al buscar usuario por campo');
        }
    },
    deleteUserByEmail: async (email) => {
        try {
            await users.destroy({
                where: {
                    email: email
                }
            });
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, error };
        }
    },
    update: async (userId, userData) => {
        try {
            userData.password = bcrypt.hashSync(userData.password, 10);
            
            await users.update(userData, {
                where: {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
}

module.exports = model;