const express = require('express');
//const { insertUser } = require('../controllers/usersController');
const usersController = require('../controllers/usersController_2');
const authTools = require('../utils/authTools.js');
var router = express.Router();

/*********************************
             /users Routes 
*********************************/

//CREATE - POST - INSERT 
router.post('/authenticate', usersController.authenticate);
router.post('/register', usersController.insertUser);

//READ GET - brings the register form
router.get('/register', (req, res) => res.render('register', {error: ''}));
router.get('/login', (req, res) => res.render('login', {error: ''}));
router.get('/profile', (req, res) => res.render('profile', {error: (req.session.user == undefined) ? 'Acceso no Autorizado' : undefined, user:  req.session.user}));//le deberia pasar la variable de session del nombre de usuario
router.get('/session/:idToken', usersController.setSession);
router.get('/logout', usersController.destroySession);
router.get('/token', usersController.sendToken);

//READ - GET - SELECT all users
router.get('/', authTools.verificarToken, usersController.getAllUsers);

//READ - GET - SELECT user by id
router.get('/:id', authTools.verificarToken, usersController.getUserById);

//READ GET - SELECT user by field name an value of the field
router.get('/:field/:value', authTools.verificarToken, usersController.getUserByField);



//UPDATE - PATCH - UPDATE by id
//router.patch('/:id', authTools.verificarToken, usersController.updateUser);

//DELETE - DELETE - DELETE by id
router.delete('/:id', authTools.verificarToken, usersController.deleteUser);

module.exports = router;

