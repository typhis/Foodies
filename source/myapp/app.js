var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

var routes = require('./routes/index');
//var users = require('./routes/users');
var register = require('./routes/register');
var login = require('./routes/login');
var restaurant = require('./routes/restaurant');
var resadddish = require('./routes/restaurant');

var app = express();

//connect to DB
mongoose.connect(config.database, function(err) { // connect to database
    if (err)
  console.log('connection error ', err);
    else
  console.log('connection successful');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);
app.use('/register', register);
app.use('/login', login);
app.use('/restaurant', restaurant);
app.use('/resadddish', resadddish);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
//configuration

app.set(function() {
  
  // Allow parsing cookies from request headers
  this.use(express.cookieParser());
  // Session management
  this.use(express.session({
    // Private crypting key
    "secret": "blablabla",
    // Internal session data storage engine, this is the default engine embedded with connect.
    "store":  new express.session.MemoryStore({ reapInterval: 60000 * 10 })
  }));
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
