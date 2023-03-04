const mysql = require('mysql');

//Creates the database connection.
const connection = mysql.createConnection({
    
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    /*
    host: '190.228.29.62',
    user: 'cruscica',
    password: 'B4rt0n2018',
    database: 'ruscicacode_vicionando_series_2'*/
});

connection.connect(
    (err) => {
        if (!err) {
            console.log("Database connection OK");
        }else {
            console.log("Database connection error", err);
        }
    }
);
module.exports = connection;