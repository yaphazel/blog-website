// This app starts a server and listens on port 3000 for connections
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const lo = require("lodash")
const { time } = require("console");
const app = express(); // express module

app.set('view engine', 'ejs');

app.use( bodyParser.urlencoded({ extended : true }));

app.use(express.static(path.join(__dirname, 'public')))

const homeContent = "This is the diary of Amanda Liew.";
const aboutContent = " This diary is a place for me to capture my thoughts, feelings, and memories. A place to help me remember the things I did throughout the day and how I felt."
const contactContent = "Contact me by via email myday@gmail.com "

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

app.get('/publish', (req, res) =>{
    res.render("publish");
})

app.get('/posts/:topics', (req, res) =>{
    const topic = lo.lowerCase(req.params.topics);
    posts.forEach( (post) => {
        if(lo.lowerCase(post.title) === topic){
            res.render("posts",{
                postTitle : post.title,
                postEntry : post.entry,
                postTime: post.time
            })
        }
    });
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