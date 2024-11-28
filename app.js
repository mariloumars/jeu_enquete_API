var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var startRouter = require('./routes/start')
var personnagesRouter = require('./routes/personnages')
var loginsRouter = require('./routes/login')
var piecesRouter = require('./routes/piece')
var objetsRouter = require('./routes/objets')
var solutionRouter = require('./routes/solution')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',personnagesRouter, loginsRouter, piecesRouter, objetsRouter, startRouter, solutionRouter)

module.exports = app;
