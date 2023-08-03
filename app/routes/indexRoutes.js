const express = require('express');
//const indexController = require('../controllers/indexController');
var router = express.Router();

//Index Routes
router.get('/', (req, res) => {
    res.send('<h2>API information /</h2>\
              <h3>rutas:<h3>\
              <p>/ root directory<p>\
              <a href="https://vicionando-series-2-api.onrender.com/api/users/id">/api/users/id get user by id</a>\
              <a href="https://vicionando-series-2-api.onrender.com/api/users">/api/users/id get all users</a>');
});
router.post

module.exports = router;

