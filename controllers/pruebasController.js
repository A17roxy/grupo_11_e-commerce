const path = require('path');

const controller ={
    home: async (req,res) => {
        /* res.sendfile(path.resolve(__dirname,'../views/home.html')); */
        const db=require('../database/models')
        try {
            // EJEMPLO DE FINDBYPK y SUS RETORNOS
            // const resultado = await db.generos.findByPk(1)
            // console.log(resultado.dataValues)
            // console.log(resultado.dataValues.nombre)
            // EJEMPLO DE FINDALL Y SUS RETORNOS
             const resultado = await db.users.findAll();
             //{where: {nombre: 'Inject The Venom'} en los parentesis del findAll para filtrar
             //{order: ['nombre']}
             // este mapea los datos del registro entero, todas las filas
             const genx=resultado.map(elem=>elem.dataValues);
             // este mapea el campo nombre, de todos los registros (map de map)
             // const prueba=respuesta.map(x=>x.dataValues).map(x=>x.nombre);
             console.log(genx);
             res.send(genx);
             //res.send(genx);
             //console.log(resultado.dataValues.nombre)      
        } catch (error) {
            console.log(error);
            return;
        }
        
    },

    

}

module.exports = controller;
                                                       