var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var friends = [
  "Drew", "Liyan", "Nigel" 
];

app.get("/", function(req,res) {
  res.render("home.ejs");
})

app.get("/friends", function(req,res) {
  res.render("friends.ejs", {friends: friends});
});

app.post("/addfriend", function(req,res) {
  var newFriend = req.body.friendName;
  friends.push(newFriend);
  res.redirect("/friends");
});

app.listen(3000, process.env.IP, function() {
  console.log("Server has started sucessfully.");
});