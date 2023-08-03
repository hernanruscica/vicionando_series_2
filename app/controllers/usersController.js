
const DB_connection = require('../models/connection_db');
const usersModel = require('../models/usersModel');


module.exports = {
    getAllUsers: (req, res) => {
        // RESPONSE CODES TO USE 200 (OK) - 404 (NOT FOUND)
        
        usersModel.getAll(DB_connection, (err, results) => {
            console.log('getAll');    
            if (!err){
                res.status(200).json({message: 'Results', results: results});        
            }else{
                res.status(404).json({message: 'DB Error', results: results});
            }        
        });               
    },
    getUserByField: (req, res) => { 
        let field = req.params.field;       
        let value = req.params.value;
        usersModel.getByField(field, value, DB_connection, (err, results) => {
            if (!err){
                if (results.length > 0){
                    res.status(200).json({message: 'OK', results: results});        
                }else{
                    res.status(404).json({message: 'Not Found', results: results});        
                }                
            }else{
                res.status(404).json({message: 'DB Error', results: results});
            }   
        })
    },
    getUserById: (req, res) => {
        let id = req.params.id;
        usersModel.getById(id, DB_connection, (err, results) => {
            if (!err){
                if (results.length > 0){
                    res.status(200).json({message: 'OK', results: results});        
                }else{
                    res.status(404).json({message: 'Not Found', results: results});        
                }                
            }else{
                res.status(404).json({message: 'DB Error', results: results});
            }   
        })
    },
    insertUser: async (req, res) => {
        let data = req.body;        
         await usersModel.insert(data, DB_connection, (err, results) => {                    
            if (!err){                
                    res.status(200).json({message: 'OK', results: data});    
            }else{                
                if (err.code == 'ER_DUP_ENTRY'){                    
                    res.status(409).json({message: 'User already exists', results: results});
                }else {
                    res.status(500).json({message: 'Error inserting user', results: results});
                }
            }      
        })
    },
    updateUser: async (req, res) => {                
        const {id} = req.params;
        let data = req.body;    
        
        await usersModel.update(data, id, DB_connection, (err, results) => {
            if (!err){
                if (results.affectedRows > 0){
                    res.status(200).json({message: 'OK', results: results});     
                }else {
                    res.status(409).json({message: "User doesn't exists", results: results});
                }   
            }else{
                res.status(500).json({message: 'Error updating user', results: err});
            }
        })
    },
    deleteUser: async (req, res) => {
           
        const { id  } = req.params;      
        await usersModel.delete(id, DB_connection, (err, results) => {
            if (!err){
                if (results.affectedRows > 0){
                    res.status(200).json({message: 'OK', results: results});     
                }else {
                    res.status(409).json({message: "User doesn't exists", results: results});
                }                 
            }else{                
                res.status(500).json({message: 'Error deleting user', results: err});
            }
        })
    }
}