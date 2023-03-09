
const DB_connection = require('../models/connection_db');
const trackedShowsModel = require('../models/trackedShowsModel');

module.exports = {
    insert: async (req, res) => {        
        let data = req.body;                    
        await trackedShowsModel.insert(data, DB_connection, (err, results) => {
            if (!err){
                res.status(200).json({message: 'OK', results: data});  
            }else{
                res.status(500).json({message: 'Error inserting tracked show', results: err});
            }
        });        
    },
    getAllTrackedShowsByUser: async (req, res) => {
        let userId =  req.params.userId;           
        await trackedShowsModel.getAllTrackedShowsByUser(userId, DB_connection, (err, results) => {
            if (!err){
                if (results.length > 0) res.status(200).json({message: 'OK', results: results});  
                else res.status(404).json({message: 'Not Found', results: results});
            }else{
                res.status(500).json({message: 'Error searching tracked show', results: err});
            }
        });         
    },
    getTrackedShowById: async (req, res) => {

    },
    getTrackedShowsByField: async (req, res) => {

    }
}