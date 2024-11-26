var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var personnagesRouter = require('./routes/personnages')
var inventaireRouter = require('./routes/inventaire');
var loginRouter = require('./routes/login')
var pieceRouter = require('./routes/piece')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',personnagesRouter, inventaireRouter, loginRouter, pieceRouter)

module.exports = app;
