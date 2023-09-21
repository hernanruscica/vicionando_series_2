const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");

const app = express();

// Configura CORS para permitir solicitudes desde cualquier origen (en desarrollo)
app.use(cors());

/*for the index, with some documentation*/
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(cookieSession({
    name: "session",
    keys: ["secret-key"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }));

const handle404 = (req, res, next) => {
  res.status(404).send("<h1>ERROR 404</h1> <h2>Ruta No encontrada</h2><p><a href='/'>Puede volver al inicio</a><br></p>");
};

const indexRouter = require('./app/routes/indexRoutes');
const usersRouter = require('./app/routes/usersRoutes_2');
//const trackedShowsRouter = require('./app/routes/trackedShowsRoutes');


const hostName = "localhost"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
//app.use('/api/tracked-shows', trackedShowsRouter);
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('./public'));

app.use(handle404);

const port = 3001;


app.listen(port, () => console.log(`App escuchando en http://${hostName}:${port}`));


  
  
  
  