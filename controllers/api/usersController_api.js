const usersModels = require('../../models/usersModels');

const controller = {
    getList: async (req, res) => {
        try {
            const users = await usersModels.findAllApi();
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
            const user = await usersModels.findLast();
            res.json({
                data: user,
                status: 200
            })

        } catch(error){
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await usersModels.findById(req.params.id);
            user.image = "/public/"+user.image;
            res.json({
                data: user,
                status: 200
            })
        } catch(error){
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    }
}


module.exports = controller;