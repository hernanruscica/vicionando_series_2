const express = require('express');
//const indexController = require('../controllers/indexController');
var router = express.Router();

//Index Routes
router.get('/', (req, res) => {
    res.send('<p>root directory /</p>');
})

module.exports = router;

