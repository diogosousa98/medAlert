var express = require('express');
var path = require('path');
var cors = require("cors");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connection = require("./models/connection");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clienteRouter = require('./routes/clienteRoute');
var alertaRouter = require('./routes/alertaRoute');


var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/clientes', clienteRouter);
app.use('/api/alertas', alertaRouter);
module.exports = app;