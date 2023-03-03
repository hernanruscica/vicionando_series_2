const express = require('express');
const usersController = require('../controllers/usersController');
var router = express.Router();

//Users Routes
router.get('/', usersController.getAllUsers);


module.exports = router;

