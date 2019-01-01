const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/nodekb')
let db = mongoose.connection;

// Check DB connection
db.once('open', () => {
    console.log("connected to DB")
});

// Check for DB errors
db.on('error', (err) => console.log(err));

// Init app
const app = express();

// Use body-parser middleware for post requests
// To Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// To Parse application/json
app.use(bodyParser.json());

// Import Models
const Article = require('./models/article');

// Load view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug')

// Default route
app.get('/', (req,res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", {
                title: "Articles",
                items: articles
            })
        }
    });
});

// Add route
app.get('/add', (req,res) => {
    res.render("add", {
        title: "Add Articles" 
    });
});

// Post route
app.post('/add', (req,res) => {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save((err)=>{
        if(err) {
            console.log(err);
            res.render("error");
        } else {
            res.redirect('/');
        }
    });
});

// Port to start server on
app.listen(3000, () => {
    console.log('Server started on port 3000');
});