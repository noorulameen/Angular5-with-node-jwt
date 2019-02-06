"use strict";
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();
var mysqlConnection = require('./database/mysqlConnection');
app.set('port', 3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
    app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler

/*app.use(function(req, res, next) {
  next(createError(404));
});*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.use(bodyParser.json({limit:'20mb'}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }else {
        next();
    }
});
app.disable('x-powered-by');
mysqlConnection.init();
require('./routes/index')(app);
app.listen(app.get('port'));


process.on('uncaughtException', function(err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
});

console.log("Application running on " + app.get('port'));

//module.exports = app;
