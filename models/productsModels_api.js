const db = require('../database/models/index.js');
const initModels = require('../database/models/init-models');
const models = initModels(db.sequelize); 
const op = db.sequelize.op;
const { products, genres } = models


const model = {

    findAll: async function () {
        try {
            return await products.findAll({  include: [{
                model: genres,
                as: 'id_genre_genre',
                attributes: ['genre']
              }]});
        } catch (error) {
            console.error(error);
            throw new Error('Error al recuperar usuarios');
        }
    },
    findById: async function(id) {
        try {
            const product = await products.findByPk(id, {  include: [{
                model: genres,
                as: 'id_genre_genre',
                attributes: ['genre']
              }]});
 
            return product;
        } catch (error) {
            console.error(error);
            throw new Error('Error al buscar usuario por correo id');
        }
    }
}

module.exports = model;