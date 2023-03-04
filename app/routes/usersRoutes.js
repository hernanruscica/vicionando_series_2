const express = require('express');
const usersController = require('../controllers/usersController');
var router = express.Router();

//users Routes
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.get('/:field/:value', usersController.getUserByField);

router.post('/', usersController.insertUser);


module.exports = router;

