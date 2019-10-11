// Express package
var express = require("express");
var app = express();
app.use(express.static("assets"));
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

app.get('/leaderboard_feed', function (req, res) {
    connection.query('SELECT * FROM scores ORDER BY score DESC, time DESC;    ', function (error, results, fields) {
        if (error) res.send(error)
        else res.json(results);
    });
});

//////////////////////////////////////////////////////////////////////

app.get('/questions', function (req, res) {
    connection.query('SELECT * FROM questions_and_answers;', function (error, results, fields) {
        if (error) res.send(error)
        else res.json(results);
    });
});

//////////////////////////////////////////////////////////////////////

app.get('/comment_feed', function (req, res) {
    connection.query('SELECT comments.id, comments.comment, scores.player_name, scores.score, scores.time FROM comments LEFT JOIN scores ON comments.comm_id = scores.id ORDER BY  comments.id ASC; ', function (error, results, fields) {
        if (error) res.send(error)
        else res.json(results);
    });
});

//////////////////////////////////////////////////////////////////////

app.post('/insert', function (req, res) {
    // res.json(req.query);
    console.log("Score: " + req.body.score)
    console.log("Name: " + req.body.playerName)
    console.log("Time: " + req.body.time)


    connection.query('INSERT INTO scores (score, time, player_name) VALUES (?, ?, ?)', [req.body.score, req.body.time, req.body.playerName], function (error, results, fields) {
        console.log("Insert connection done")
        if (error) res.send(error)
        else res.json({ id: results.insertId });
    });
})

//////////////////////////////////////////////////////////////////////

app.post('/insert_comment', function (req, res) {
    // res.json(req.query);
    console.log("Comment: " + req.body.comment);
    console.log("Comm_id: " + req.body.comm_id);



    connection.query('INSERT INTO comments (comment, comm_id) VALUES (?, ?)', [req.body.comment, req.body.comm_id], function (error, results, fields) {
        console.log("Comment Insert connection done")
        if (error) res.send(error);
        else res.redirect('/comments');
    });
});
//////////////////////////////////////////////////////////////////////

app.get('/scores', function (req, res) {
    connection.query('SELECT * FROM scores;', function (error, results, fields) {
        if (error) res.send(error);
        else res.json(results);
    });
});

//////////////////////////////////////////////////////////////////////

app.listen(3000, function () {
    console.log('listening on 3000');
});