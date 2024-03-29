const createError = require('http-errors');
const express = require('express');
const path = require('path');

const cors = require("cors");

const clientRoutes = require('./routes/client');

const app = express();


app.use(
  cors()
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ type: "application/x-www-form-urlencoded" }));
app.use(express.static(path.join(__dirname, 'public')));



const clientRouter = express.Router();
clientRoutes(clientRouter);
app.use('/client', clientRouter);

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
