const usersModels = require('../../models/usersModels');

const controller = {
    getList: async (req, res) => {
        try {
            const users = await usersModels.findAll();
            res.json({
                total: users.length,
                data: users,
                status: 200
        })
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },
    getLast: async(req,res) => {
        try{
            const lastUser = await usersModels.findLast();
            res.json({
                data: lastUser,
                status: 200
            })

        } catch(error){
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    }
}


module.exports = controller;