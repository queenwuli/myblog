var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config=require('./dbconfig');
var flash=require('connect-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


var index = require('./routes/index');
var users = require('./routes/users');
var article = require('./routes/article');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.set('view engine', 'html');
// app.engine('html',require('ejs')._express);

app.use(cookieParser());
app.use(session({
  secret:'myblog',
  resave:true,
  cookie:{maxAge:1000*60*30},
  saveUninitialized:true,
  store:new MongoStore({
    url:config.dburl
  })
}));
app.use(flash());
app.use(function (req,resp,next){
  resp.locals.user=req.session.user;
  resp.locals.success=req.flash("success");
  resp.locals.error=req.flash("error");
  next();
})
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/article',article)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
  res.render('error');
});

module.exports = app;
