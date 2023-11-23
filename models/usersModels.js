const uuid = require('uuid');
const bcrypt = require('bcrypt');

const db = require('../database/models/index.js');
const initModels = require('../database/models/init-models');
const models = initModels(db.sequelize); 
const op = db.sequelize.op;
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
    findAllApi: async function () {
        try {
            return await users.findAll({
                attributes: { exclude: ['id','password', 'id_category', 'updatedAt'] },
                order: [['createdAt', 'ASC']]
            });
        } catch (error) {
            console.error(error);
            throw new Error('Error al recuperar usuarios');
        }
    },
    findLast: async function() {
        try {
            const user = await users.findOne({ order: [['createdAt', 'DESC']],
            attributes: { exclude: ['id','password', 'id_category', 'updatedAt'] } });
            return user;
        } catch (error) {
            console.error(error);
            throw new Error('Error al recuperar el último usuario creado');
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
            throw new Error('Error al crear usuario');;
        }
    },

    findByEmail: async (email) => {
        try {
            const user = await users.findOne({ where: { email } });
            
            return user;
        } catch (error) {
            console.error(error);
            throw new Error('Error al buscar usuario por correo electrónico');
        }
    },
    findById: async function(id) {
        try {
            const user = await users.findByPk(id, {
                attributes: { exclude: ['password', 'id_category', 'updatedAt']}});
 
            return user;
        } catch (error) {
            console.error(error);
            throw new Error('Error al buscar usuario por correo id');
        }
    },
    findByField: async function (field, text) {
        try {
            const user = await users.findOne({ where: { [field]: text } });
            return user;
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