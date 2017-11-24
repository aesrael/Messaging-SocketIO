var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var socket = require('socket.io')
var flash = require('connect-flash');
var bcrypt = require('bcryptjs');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport=require('passport')
var LocalStategy = require('passport-local').Strategy;

var creds = require('./creds.js')

const index = require('./routes/index');
const api=require('./routes/api.js')

// App setup
var app = express();
var server = app.listen(8080, function () {
  console.log('listening at 8080,');
});

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

  console.log('made socket connection', socket.id);

  // Handle chat event
  socket.on('chat', function (data) {
    // console.log(data);
    io
      .sockets
      .emit('chat', data);
  });

  // Handle typing event
  socket.on('typing', function (data) {
    socket
      .broadcast
      .emit('typing', data);
  });

});

const mongoDb = creds.creds.mongoDb
mongoose.connect(mongoDb, {useMongoClient: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('connection to database established')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Express Session
app.use(session({secret: 'secret', saveUninitialized: true, resave: true}));

// Express Validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    const namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {param: formParam, msg: msg, value: value};
  }
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
app.use('/', index);
app.use('/api', api);

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req
    .app
    .get('env') === 'development'
    ? err
    : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;