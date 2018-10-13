var express = require("express");
var app = express();

app.use(express.static("public"));

app.get("/", function(res,res) {
  res.render("home.ejs");
});

app.get("/test/:thing", function(req,res) {
  var thing = req.params.thing;
  res.render("like.ejs", {thing: thing});
});

app.get("/posts", function(req,res) {
  var posts = [
    {title: "Post 1", author: "Mckenzie"},
    {title: "Post 2", author: "Mckenzie"},
    {title: "Post 3", author: "Mckenzie"}
  ];
  res.render("posts.ejs", {posts, posts});
});

app.listen(3000, process.env.IP, function() {
  console.log("Server has started sucessfully.");
});