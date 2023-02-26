// This app starts a server and listens on port 3000 for connections
const express = require("express");
const ejs = require('ejs');
const path = require('path');
const bodyParser = require("body-parser");
const { time } = require("console");
const app = express(); // express module

app.set('view engine', 'ejs');

app.use( bodyParser.urlencoded({ extended : true }));

app.use(express.static(path.join(__dirname, 'public')))

var date = new Date();
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let currentDate = date.toLocaleDateString("en-US", options);

const homeContent = "This is the diary of Amanda Liew.";
const aboutContent = " This diary is a place for me to capture my thoughts, feelings, and memories. A place to help me remember the things I did throughout the day and how I felt."
const contactContent = "Contact me by via email myday@gmail.com "
const firstContent = "Today, I visited my old school. It brought back so many memories. I walked through the halls, remembering all the good times I had there. I even ran into some of my old teachers. They were all so happy to see me. It was great to walk down memory lane, but it also made me realize how much I’ve grown since then. I’m so grateful for my education and all the opportunities my school gave me. I’m definitely going to visit again soon!"

var posts = [];
// get request
app.get('/', (req, res) => {
    res.render("home",{
        intro : homeContent,
        posts : posts
    });
})

app.get('/about', (req, res) =>{
    res.render("about",{
        about : aboutContent
    });
})

app.get('/contact', (req, res) =>{
    res.render("contact",{
        contact : contactContent
    });
})

app.get('/post', (req, res) =>{
    res.render("post");
})

app.post('/', (req, res) =>{
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute: 'numeric'};
    const timestamp = date.toLocaleString('en-US',options);
    const post = {
        title : req.body.postTitle,
        entry : req.body.postEntry,
        time : timestamp
    }
    
    posts.push(post);
    res.redirect("/");
});

app.listen(3000, function(){
    console.log('Server listening on port 3000');
});