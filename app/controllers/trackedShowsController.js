
const DB_connection = require('../models/connection_db');
const trackedShowsModel = require('../models/trackedShowsModel');

module.exports = {
    insert: async (req, res) => {
        console.log("trackedShowsController");
        await trackedShowsModel.insert();
    }
}