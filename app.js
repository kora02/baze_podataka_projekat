var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var proizvodRouter = require('./routes/proizvodi');
var narudzbaRouter = require('./routes/narudzba');
var getRouter = require('./routes/getzaduzenja');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/proizvodi', proizvodRouter);
app.use('/status', narudzbaRouter);
app.use('/getz', getRouter);


module.exports = app;
