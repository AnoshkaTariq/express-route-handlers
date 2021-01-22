"use strict";

var config = require('config');

var express = require('express');

var logger = require('./middleware/logger');

var authenticate = require('./middleware/authenticate'); // const helmet = require('helmet');


var morgan = require('morgan');

var debug = require('debug')('app:startup');

var courses = require('./routes/courses');

var app = express(); // app.use() is used to call middleware functions in sequence

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(logger);
app.use(authenticate); // app.use(helmet());
// app.use(morgan('tiny'));

debug(app.get('env'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled');
}

app.use('/api/courses', courses);
app.set('view engine', 'pug'); // app.set('views', './views');

app.get('/', function (req, res) {
  res.render('index', {
    title: 'My express app',
    message: 'Hello'
  });
}); // get route 

app.get('/', function (req, res) {
  res.send('Hello World!!!');
}); // setting the environment variable

var port = process.env.PORT || 3000;
app.listen(port, function () {
  return debug("Listening on port ".concat(port));
});
debug("NODE_ENV: ".concat(process.env.NODE_ENV));
debug("Application Name: ".concat(config.get('name'), ",  Mail-server:  ").concat(config.get('mail.host')));
debug("Mail Password:  ".concat(config.get('mail.password')));