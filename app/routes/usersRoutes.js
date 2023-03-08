const express = require('express');
const { insertUser } = require('../controllers/usersController');
const usersController = require('../controllers/usersController');
var router = express.Router();

/*********************************
             users Routes
*********************************/

//CREATE - POST - INSERT
router.post('/', usersController.insertUser);

//READ - GET - SELECT
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.get('/:field/:value', usersController.getUserByField);

//UPDATE - PATCH - UPDATE
router.patch('/:id', usersController.updateUser);

//DELETE - DELETE - DELETE
router.delete('/:id', usersController.deleteUser);

module.exports = router;

