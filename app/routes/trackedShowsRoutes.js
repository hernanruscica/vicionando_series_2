const express = require('express');
const trackedShowsController = require('../controllers/trackedShowsController');
var router = express.Router();


/*********************************
       tracked shows Routes
*********************************/


//CREATE - POST - INSERT
router.post('/', trackedShowsController.insert);

//READ - GET - SELECT
router.get('/user/:userId', trackedShowsController.getAllTrackedShowsByUser);
router.get('/:id', trackedShowsController.getTrackedShowById);
router.get('/:field/:value', trackedShowsController.getTrackedShowsByField);

module.exports = router;

