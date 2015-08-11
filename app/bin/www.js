var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var favicon = require('serve-favicon');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('../config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to the mongoDB database

require('../config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(favicon('./public/fav.ico'));

// Views
app.set('views', 'app/views');
app.set('view engine', 'jade');
app.use(express.static('./public'));

// required for passport
app.use(session({
    secret: 'mypassportsecret',
    name: 'secret_name',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('../routes')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
exports.start = function () {
    app.listen(port, function () {
        console.log('Started Node @ localhost:' + port);
    });
};
