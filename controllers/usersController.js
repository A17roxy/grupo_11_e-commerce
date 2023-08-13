const usersModel = require('../models/usersModels');

const controller = {
    getList: (req, res) => {
        const users = usersModel.findAll();

        // Mostraría la vista users.ejs ...
        // res.send('users', { users });
    }
}

module.exports = controller;