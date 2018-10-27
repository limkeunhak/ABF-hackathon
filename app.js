"use strict"

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const http = require('http');
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');
const introRouter = require('./routes/introRouter');
const registRouter = require('./routes/registRouter');
const inquiryRouter = require('./routes/inquiryRouter');
const additionalServiceRouter = require('./routes/additionalServiceRouter');
const sellingRouter = require('./routes/sellingRouter');
const companyRouter = require('./routes/companyRouter');
const redis = require('redis');
const client = redis.createClient();

// Set test users
client.set('user1', 'user1');
client.set('user2', 'user2');
client.set('user3', 'user3');
client.set('user4', 'user4');

const app = express();

// view engine setup
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/regist'),
  path.join(__dirname, 'views/intro'),
  path.join(__dirname, 'views/inquiry'),
  path.join(__dirname, 'views/additional-service'),
  path.join(__dirname, 'views/selling'),
  path.join(__dirname, 'views/company')
]);
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout extractScripts', true);
app.set('layout', 'layout');		// default로 layout.ejs를 렌더링. 파일명 변경가능

app.use('/', indexRouter);
app.use('/intro', introRouter);
app.use('/regist', registRouter);
app.use('/inquiry', inquiryRouter);
app.use('/selling', sellingRouter);
app.use('/additional-service', additionalServiceRouter);
app.use('/company', companyRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}
