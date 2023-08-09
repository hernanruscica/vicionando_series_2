const express = require('express');
//const { insertUser } = require('../controllers/usersController');
const usersController = require('../controllers/usersController');
const authTools = require('../utils/authTools.js');
var router = express.Router();

/*********************************
             /users Routes 
*********************************/

//CREATE - POST - INSERT 
router.post('/authenticate', usersController.authenticate);
router.post('/', usersController.insertUser);

//READ - GET - SELECT all users
router.get('/', authTools.verificarToken, usersController.getAllUsers);

//READ - GET - SELECT user by id
router.get('/:id', authTools.verificarToken, usersController.getUserById);

//READ GET - SELECT user by field name an value of the field
router.get('/:field/:value', authTools.verificarToken, usersController.getUserByField);

//UPDATE - PATCH - UPDATE by id
router.patch('/:id', authTools.verificarToken, usersController.updateUser);

//DELETE - DELETE - DELETE by id
router.delete('/:id', authTools.verificarToken, usersController.deleteUser);

module.exports = router;

