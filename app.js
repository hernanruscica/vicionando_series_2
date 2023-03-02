const express = require('express');
//const path = require('path');

const app = express();

/*for the index, with some documentation
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
*/

const indexRouter = require('./app/routes/indexRoutes');
const usersRouter = require('./app/routes/usersRoutes');
const trackedShowsRouter = require('./app/routes/trackedShowsRouter');


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tracked_shows', trackedShowsRouter);


app.listen(1000, () => console.log(`App escuchando en http://localhost:1000`));