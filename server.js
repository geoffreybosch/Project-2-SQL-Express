// Express package
var express = require("express");
var app = express();

//////////////////////////////////////////////////////////////////////

// set the view engine to ejs
app.set('view engine', 'ejs');

//////////////////////////////////////////////////////////////////////

// Method Override Package
var methodOverride = require('method-override')

app.use(methodOverride('_method'))

//////////////////////////////////////////////////////////////////////

// dotenv package
// add dotenv package for hiding private data
// require("dotenv").config();
// var keys = require("./keys.js");

//////////////////////////////////////////////////////////////////////

// path package
var path = require("path");

//////////////////////////////////////////////////////////////////////

//Body Parser package
//to be able to use app.post
//body-parser allows us to access the body of a request, which we need when doing a post route	
var bodyParser = require('body-parser')

//integrate body-parser with express

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//////////////////////////////////////////////////////////////////////

//MySQL package
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlpassword',
    database: 'project_2'
});

connection.connect();

//////////////////////////////////////////////////////////////////////

app.get('/', function (req, res) {
    res.render('pages/home');
});

//////////////////////////////////////////////////////////////////////

app.get('/quiz', function (req, res) {
    res.render('pages/quiz');
});

//////////////////////////////////////////////////////////////////////

app.get('/comments', function (req, res) {
    res.render('pages/comments');
});

//////////////////////////////////////////////////////////////////////

app.get('/leaderboard', function (req, res) {
    res.render('pages/leaderboard');
});

//////////////////////////////////////////////////////////////////////

app.listen(3000, function () {
    console.log('listening on 3000');
});