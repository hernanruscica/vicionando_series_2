const express = require('express');
//const { insertUser } = require('../controllers/usersController');
const usersController = require('../controllers/usersController');
const authTools = require('../utils/authTools.js');
var router = express.Router();

/*********************************
             users Routes
*********************************/

//CREATE - POST - INSERT
router.post('/', usersController.insertUser);
router.post('/authenticate', usersController.authenticate);

//READ - GET - SELECT
router.get('/', usersController.getAllUsers);

//en esta ruta quiero probar la autenticacion del token
router.get('/:id', authTools.verificarToken, usersController.getUserById);


router.get('/:field/:value', usersController.getUserByField);

//UPDATE - PATCH - UPDATE
router.patch('/:id', usersController.updateUser);

//DELETE - DELETE - DELETE
router.delete('/:id', usersController.deleteUser);

module.exports = router;

