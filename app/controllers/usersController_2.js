const jwt  = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');
//const DB_connection = require('../models/connection_db_2');
const usersModel = require('../models/usersModel_2');
const mail = require('../utils/mail');


module.exports = {
    getAllUsers: async (req, res) => {
        // RESPONSE CODES TO USE 200 (OK) - 404 (NOT FOUND)
        try{
            console.log('getAll'); 
            let results = await usersModel.getAll();                
            return res.status(200).json({message: 'Results', results: results}); 
        }catch (error){
            return res.status(404).json({message: `DB ERROR: ${error}`, results: {nombre: 'pepe'}});
        }             
    },
    getUserByField: async (req, res) => { 
        let field = req.params.field;       
        let value = req.params.value;
        try{
            console.log('getUserByField'); 
            let results = await usersModel.getByField(field, value);            
            if (results.length > 0){
                return res.status(200).json({message: 'Results', results: results})        
            }else{
                res.status(404).json({message: 'Not Found', results: results});        
            }     
        }catch (error){
            return res.status(404).json({message: `DB ERROR: ${error}`, results: results});
        }  
        
    },
    
    insertUser: async (req, res) => {        
        data = {
            name : req.body.name, 
            email : req.body.email,
            password : req.body.password,
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
            // Generar el token JWT para acceso a los endpoints de la API, se envia por mail al registrarse
            token = jwt.sign({userName: data.name}, process.env.SECRET_KEY, {expiresIn: 86400});
            //res.send({token});
            }
        catch (error){
            console.error('Error generating the token JWT:', error);
            res.status(500).json({ message: 'Error generating the token JWT'});
            }   

        await usersModel.insert(data)
        .then((results) => {
            // Realizar acciones de éxito aquí si es necesario                    
            console.log("Inserción exitosa:", results);
            mail.sendWelcome(data, token);
            res.status(200).render('home', {message: `Se registró correctamente, se envió su token al correo ${data.email}`});
        })
        .catch((error) => {
            // Manejar el error y enviar una respuesta HTTP aquí
            console.error("Error en la inserción:");
            if (error.code == 'ER_DUP_ENTRY'){                    
                res.status(409).render('home', {message: `Ya existe un usuario con ese nombre de usuario o correo registrado en el sitio` });                    
            }else {
                res.status(500).render('home', {message: `Ocurrió un error al insertar el usuario en la base de datos` });                    
                console.log(err)
            }                    
        });
    },
    updateUser: async (req, res) => {                
        const {id} = req.params;
        let data = req.body;  
        
        await usersModel.update(data, id)
        .then((results) => {
            // Realizar acciones de éxito aquí si es necesario    
            if (results.affectedRows > 0){
                console.log("El registro se actualizo correctamente:", results);                        
                return res.status(200).render('profile',{user: req.session.user, message: `El registro se actualizo correctamente` })                
                //return res.json({message: `El registro se actualizo correctamente`,results: data });
            }else{
                return res.status(409).render('profile',{ message: "User doesn't exists", results: results});
            }       
            
        })
        .catch((error) => {
            // Manejar el error y enviar una respuesta HTTP aquí
            console.error("Error en la actualizacion del registro:");
            if (error.code == 'ER_DUP_ENTRY'){                    
                return res.status(409).render('profile', {message: `Ya existe un usuario con ese nombre de usuario o correo registrado en el sitio` });                    
            }else {
                res.status(500).render('profile', {message: `Ocurrió un error al insertar el usuario en la base de datos` });                    
                return console.log(err)
            }                    
        });
    }, 
    deleteUser: async (req, res) => {           
        const { id  } = req.params;      
        usersModel.delete(id)
            .then((results) => {
                if (results.affectedRows > 0){
                    res.status(200).json({message: 'DELETED', results: results});     
                }else {
                    res.status(409).json({message: "User doesn't exists", results: results});
                }                 
        })
            .catch((error) => {
                res.status(500).json({message: 'Error deleting user', results: err});
            })       
    },
   
    getUserById: async (req, res) => {
        let id = req.params.id;
        console.log("searching by id: ", id)    
        try {
            const results = await usersModel.getById(id);
            if (results.length > 0) {                
                const user = results[0];  
                return res.status(200).json({message: 'OK', results: user});
            }else{
                return res.status(404).json({message: 'Not Found', results: results});
            }

        } catch (error){
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }            
               
    },
    authenticate: async (req, res) => {
        const userName = req.body.username;
        const password = req.body.password;
        console.log("authenticating ", userName, password);        
        
        try {
            const results = await usersModel.getByFieldStrict('name', userName); 
            
            if (results.length > 0) {                
                const user = results[0];             
        
                // Verificar la contraseña utilizando bcrypt
                const passwordMatch = await bcrypt.compare(password, user.password);
        
                if (passwordMatch) {     
                //token para autenticar en el inicio de sesion solamente, y mostrar solo el perfil del usuario logueado, proteje rutas '/session/:idToken'
                let idToken = jwt.sign({id: results[0].id}, process.env.SECRET_KEY, {expiresIn: 86400});
                res.redirect(`/api/users/session/${idToken}`); 
                } else {
                return res.status(401).render('login', { error: 'Invalid credentials' });
                }
            } else {
                return res.status(401).render('login',{ error: 'Invalid credentials' });
            }
          
        } catch (error) {
          console.error(error);
          return res.status(500).send({ error: 'Internal Server Error' });
        }
    },
    setSession: async (req, res) => {      
        let idToken = req.params.idToken;    
        console.log(`autenticando el token id: ${idToken}`)
       
        let userId = null;
        try {
            const decoded = jwt.verify(idToken, process.env.SECRET_KEY);
            userId = decoded.id;
            console.log('ID del usuario:', userId);
          } catch (error) {
            if (typeof req.session.user != undefined){
                console.error('Token invalido pero está logueado', error.message);
                return res.status(401).render('profile',{user: req.session.user, message: 'Token invalido ! Solo puede ver su perfil' })
            }else{
                return res.status(401).render('home',{ message: 'Token invalido, debe iniciar sesion para ver su perfil' })
            }
            
          }

        try{
            const results =  await usersModel.getById(userId);
            if (results.length > 0) {                                
                console.log("encontre al usuario por id", results[0].name)
                req.session.user = {
                    name: results[0].name,
                    id: results[0].id,
                    email: results[0].email,
                    password: results[0].password,
                    idToken: idToken
                };       
                res.redirect('/api/users/profile');   
                //return res.status(200).render('profile',{user: req.session.user, message: 'Bienvenido' }) 
            } else {
                res.render('login', {error: 'No se encontro al usuario'});
            }
        }catch (error){
            console.log("error al buscar al usuario por id");
            res.render('login', {error: 'Error al buscar en la BD'});
        }        
    },
    
    destroySession: (req, res) => {        
        console.log("Session destroyed successfully");
        req.session.user = undefined;
        //req.session.authenticate = false;
        res.redirect('/');
    },
    sendToken: (req, res) => {
        if (req.session.user) {
            try{
                console.log(req.session.user);
                let token = jwt.sign({userName: req.session.user.name}, process.env.SECRET_KEY, {expiresIn: 86400});
                mail.sendToken(req.session.user, token);
                res.status(200).render('profile', {user: req.session.user, message: `Se genero un nuevo token correctamente, se envió al correo ${req.session.user.email}`}); 
            }catch (error){
            console.error('Error generating and sending token JWT:', error);
            }
            
        }else{
            console.log('no esta logueado');
            res.redirect('/api/users/login')
        }
    }/**/
      
}