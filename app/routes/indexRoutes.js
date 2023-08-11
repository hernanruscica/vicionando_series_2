const express = require('express');
//const indexController = require('../controllers/indexController');
var router = express.Router();

//Index Routes
router.get('/', (req, res) => {    
    
    res.render('home', {hostName: req.hostname, port: (req.hostname == 'localhost') ? ':3001' : '', user: req.session.user});
    console.log(req.headers.host)
});

module.exports = router;

