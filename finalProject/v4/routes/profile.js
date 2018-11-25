var express = require("express");
var router = express.Router();
var Model3D = require("../schemas/models.js");
var middleware = require("../middleware/index.js");
var User = require("../schemas/users.js");

// User Profile Routes

router.get("/users/:id", function(req,res) {
  User.findById(req.params.id, function(error, user) {
    console.log(user);
    var userName = user.username;
    console.log(userName);

    Model3D.find({"author.username": userName}, function(error, foundModels) {
      if(error) console.log(error);
      else res.render("users/show.ejs", {models: foundModels});
    });
  });
});

module.exports = router;