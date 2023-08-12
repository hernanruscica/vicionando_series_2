const jwt  = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');
const DB_connection = require('../models/connection_db');
const usersModel = require('../models/usersModel');
const mail = require('../utils/mail');


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
        data = {
            name : req.body.register_name, 
            email : req.body.email,
            password : req.body.register_password,
            roles_id : 1,
            photos_id : 2,
            real_name: req.body.real_name,  
            birthday : req.body.birthday, 
            palettes_id : 1
        }          
        let token = null;
        const saltRounds = 10; // Número de saltos para el hash bcrypt
        //console.log(data.password);
        
        try{
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
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
                    let id_recuperacion = token;
                    mail.send('cesarhernanruscica@gmail.com', data.name, id_recuperacion)
                    //res.status(200).render('viewtoken', {message: 'OK', user: data, token: token});    
                    res.redirect(`/api/users/session/${results.insertId}`);
                    //res.status(200).send({insertId: results.insertId})
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
                //return res.status(200).render('viewToken', { token , userName});
                res.redirect(`/api/users/session/${results[0].id}`); 
              } else {
                return res.status(401).render('login', { error: 'Invalid credentials' });
              }
            } else {
              return res.status(401).render('login',{ error: 'Invalid credentials' });
            }
          });
        } catch (error) {
          console.error(error);
          return res.status(500).send({ error: 'Internal Server Error' });
        }
      },
      setSession: async (req, res) => {      
        let id = req.params.id;    
        console.log(`iniciando sesion con id: ${id}`);

        

        await usersModel.getById(id, DB_connection, (err, results) => {

            const token = jwt.sign({ userName: results[0].name }, process.env.SECRET_KEY, { expiresIn: 86400 });
            if (!err){
                console.log("encontre al usuario por id", results[0].name)
                req.session.user = {
                    name: results[0].name,
                    id: results[0].id,
                    email: results[0].email,
                    password: results[0].password,
                    token: token
                };                  
                res.redirect('/api/users/profile');   
            }else{
                console.log("error al buscar al usuario por id");
            }
            })
        //res.status(200).send(`iniciando sesion con id: ${id}`);
      },
      destroySession: (req, res) => {        
        console.log("Session destroyed successfully");
        req.session.user = undefined;
        res.redirect('/');
    },
      
}