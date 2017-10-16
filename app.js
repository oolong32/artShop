const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');

const index = require('./routes/index');

const app = express();
// Verbindung zu mongoDB je nach environment:
if ('development' === app.get('env')) {
  let mongoDB = 'mongodb://localhost:27017/foo';
    mongoose.connect(mongoDB);
  } else {
  // let mongoDB = "what is the path for production?";
  // mongoose.connect(mongoDB, { config: { autoIndex: false }});
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


// add main routes
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html');
});

// coming up next: move this to separate module
// Test some stuff happening on a regular basis
const debug = require('debug')('fubar');
debug.enabled = true;
function work() {
  if (debug.enabled) {
    debug('working');
  } else {console.log('aw shucks, debug is not working');}
    setTimeout(work, Math.random() * 1500);
}
 
// work();

module.exports = app;
