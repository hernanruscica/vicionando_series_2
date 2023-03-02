const express = require('express');
//const usersController = require('../controllers/indexController');
var router = express.Router();

//Users Routes
router.get('/', (req, res) => {
    res.status(200).send('<p>Users directory </p>').json({name: 'hernan'});
})

module.exports = router;

