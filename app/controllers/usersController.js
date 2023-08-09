const jwt  = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');
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
    getUserById: async (req, res) => {
        let id = req.params.id;
        //console.log(req.params.userName)  //if necesary you could return the user name in the response      
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
        /*
        data = {
            name : "frovira", 
            email : "fulge@hotmail.com",
            password : 1234,
            roles_id : 1,
            photos_id : 2,
            real_name: "Fulgencio rovira",  
            birthday : "1998-01-01", 
            palettes_id : 1
        }
        */
        let token = null;
        const saltRounds = 10; // Número de saltos para el hash bcrypt
        console.log(data.password);
        
        try{
            const hashedPassword = await bcrypt.hash(data.password.toString(), saltRounds);
            console.log(hashedPassword);
            data.password = hashedPassword;

            // Generar el token JWT y enviarlo como respuesta
            token = jwt.sign({userName: data.name}, process.env.SECRET_KEY, {expiresIn: 86400});
            //res.send({token});

        }
        catch (error){
            console.error('Error generating the token JWT:', error);
            res.status(500).json({ message: 'Error generating the token JWT'});
        }

         await usersModel.insert(data, DB_connection, (err, results) => {                    
            if (!err){                
                    res.status(200).json({message: 'OK', results: data, token: token});    
            }else{                
                if (err.code == 'ER_DUP_ENTRY'){                    
                    res.status(409).json({message: 'User already exists', results: results});
                }else {
                    res.status(500).json({message: 'Error inserting user', results: results});
                    console.log(err)
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
    },
    authenticate: async (req, res) => {
        const userName = req.body.username;
        const password = req.body.password;
        console.log("authenticate", userName, password)
        try {
          await usersModel.getByFieldStrict('name', userName, DB_connection, async (err, results) => {
            if (err) {
              console.error(err);
              return res.status(500).send({ error: 'Internal Server Error' });
            }
      
            if (results.length > 0) {
              const user = results[0];
      
              // Verificar la contraseña utilizando bcrypt
              const passwordMatch = await bcrypt.compare(password, user.password);
      
              if (passwordMatch) {
                const token = jwt.sign({ userName: userName }, process.env.SECRET_KEY, { expiresIn: 86400 });
                return res.send({ token });
              } else {
                return res.status(401).send({ error: 'Invalid credentials' });
              }
            } else {
              return res.status(401).send({ error: 'Invalid credentials' });
            }
          });
        } catch (error) {
          console.error(error);
          return res.status(500).send({ error: 'Internal Server Error' });
        }
      }
      
}