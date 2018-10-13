var express = require("express");
var app = express();

app.get("/", function(req,res) {
  res.send("Hi there.");
});

app.get("/bye", function(req,res) {
  res.send("Goodbye.");
});

app.get("/dog", function(req,res) {
  res.send("Woof.");
});

app.get("/r/:patternName", function(req,res) {
  var patternName = req.params.patternName;
  res.send("Welcome to the " + patternName + " page.");
});

app.get("/r/:patternName/comments/:id/:title", function(req,res) {
  res.send("Testing a more specific routing pattern.");
});

app.get("*", function(req,res) {
  res.send("That route does not exist.");
});

app.listen(3000, process.env.IP, function() {
  console.log("Server has started sucessfully.");
});