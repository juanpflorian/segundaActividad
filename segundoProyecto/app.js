var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { create } = require('express-handlebars');
const moment = require('moment');
var indexRouter = require('./routes/index');

var app = express();

const hbs = create({
  extname: '.hbs',
  helpers: {
    formatofecha: function (fecha) {
      return moment(fecha).format('YYYY,MM,DD');
    }
  }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('.hbs', hbs.engine);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});

module.exports = app;
