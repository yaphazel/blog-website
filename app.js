// This app starts a server and listens on port 3000 for connections
const express = require("express");
const ejs = require('ejs');
const app = express(); // express module

app.set('view engine', 'ejs');

var date = new Date();

let currentDate = date.toUTCString();

// get request
app.get('/', (req, res) => {
    res.render("post", {Date : currentDate});
})

app.listen(3000, function(){
    console.log('Server listening on port 3000');
});