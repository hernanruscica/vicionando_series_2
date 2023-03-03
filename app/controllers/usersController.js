
const DB_connection = require('../models/connection_db');
const usersModel = require('../models/usersModel');


module.exports = {
    getAllUsers: (req, res) => {
        // RESPONSE CODES TO USE 200 (OK) - 404 (NOT FOUND)
        usersModel.getAll(DB_connection, (err, results) => {
            if (!err){
                res.status(200).json({message: 'Results', results: results});        
            }else{
                res.status(404).json({message: 'DB Error', results: results});
            }
        });       
        
    }
}