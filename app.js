const express = require('express');
const path = require('path');

// Init app
const app = express();

// Load view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug')

// Default route
app.get('/', (req,res) => {
    let items = [
        {
            id: 1,
            description: "first item",
            weight: 50
        },
        {
            id: 2,
            description: "second item",
            weight: 24
        },
        {
            id: 3,
            description: "third item",
            weight: 88
        }
    ]
    res.render("index", {
        header1: "Index",
        items
    })
    // res.send('Hello World');
});

// Add route
app.get('/add', (req,res) => {
    res.render("add");
    // res.send('Hello World');
});

// Port to start server on
app.listen(3000, () => {
    console.log('Server started on port 3000');
});