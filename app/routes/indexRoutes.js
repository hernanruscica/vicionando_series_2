const express = require('express');
//const indexController = require('../controllers/indexController');
var router = express.Router();

//Index Routes
router.get('/', (req, res) => {    
    
    res.render('home', {hostName: req.hostname, port: 1000});
    console.log(req.headers.host)
});

module.exports = router;

