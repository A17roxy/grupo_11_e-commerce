const path = require('path');
const pistasModels = require('../models/pistasModels');

const controller ={
    pistas: (req,res) => {
        /* res.render('albums') */
        const pistas = pistasModels.findAll();
        res.render('pistas', { pistas: pistas }); // { pistas } como se llama igual es lo mismo que poner { albums: albums }
    }

}

module.exports = controller;