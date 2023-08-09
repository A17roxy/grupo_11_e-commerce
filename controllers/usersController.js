const usersModel = require('../models/usersModels');

const controller = {
    getList: (req, res) => {
        usersModel.findAll();


    }
}

module.exports = controller;