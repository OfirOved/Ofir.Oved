var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyparser = require('body-parser');
const sql = require("./DB/db.js");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//parse requests of content-type: application/json 
app.use(bodyparser.json());
//parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: true}));

//CV route
app.get('/CV', function(req, res) {
  res.sendFile(path.join(__dirname, '../ofir_oved_app/views/CV.html'));
});

app.get("/myFirstHTML", function(req, res) {
  res.sendFile(path.join(__dirname, '../ofir_oved_app/views/myFirstHtml.html'));
});

// Create a route for getting all contacts
app.get("/contacts", function(req, res){
  sql.query("SELECT * FROM contacts", (err, mysqlres) => {
      if (err) {
      console.log("error: ", err);
      res.status(400).send({message: "error in getting all contacts: " + err});
      return;
      }
      console.log("got all contacts...");
      res.send(mysqlres);
      return;
  });
});


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



//set port, listen for requests
app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});

module.exports = app;
