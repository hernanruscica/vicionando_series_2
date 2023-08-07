const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');


const app = express();

/*for the index, with some documentation*/
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');


const indexRouter = require('./app/routes/indexRoutes');
const usersRouter = require('./app/routes/usersRoutes');
const trackedShowsRouter = require('./app/routes/trackedShowsRoutes');


const hostName = "localhost"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/tracked-shows', trackedShowsRouter);
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('./public'));

const port = 3001;


app.listen(port, () => console.log(`App escuchando en http://${hostName}:${port}`));


  
  
  
  