const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");


const database = require('./routes/database');
const indexRouter = require('./routes/index');
const clientRoutes = require('./routes/client');
const sessionRoutes = require('./routes/session');
const billingRoutes = require('./routes/billing');
const loginRoutes = require('./routes/login');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  cors()
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ type: "application/x-www-form-urlencoded" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


const clientRouter = express.Router();
clientRoutes(clientRouter, database);
app.use('/client', clientRouter);

const sessionRouter = express.Router();
sessionRoutes(sessionRouter, database);
app.use('/session', sessionRouter);

const billingRouter = express.Router();
billingRoutes(billingRouter, database);
app.use('/billing', billingRouter);

const loginRouter = express.Router();
loginRoutes(loginRouter, database);
app.use('/login', loginRouter);

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

app.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port %d in %s mode");
});

module.exports = app;
