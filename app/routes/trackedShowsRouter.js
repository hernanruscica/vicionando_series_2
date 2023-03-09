const express = require('express');
const trackedShowsController = require('../controllers/trackedShowsController');
var router = express.Router();


/*********************************
       tracked shows Routes
*********************************/


//CREATE - POST - INSERT
router.get('/', trackedShowsController.insert);

module.exports = router;

