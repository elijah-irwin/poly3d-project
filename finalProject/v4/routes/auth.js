var express = require("express");
var router = express.Router();
var User = require("../schemas/users.js");
var passport = require("passport");

// ========= Authentication Routes ==========

// show register form
router.get("/register", function(req,res) {
  res.render("register.ejs");
});

// handle sign up request
router.post("/register", function(req,res) {
  
  // create new User with username from form data
  var newUser = new User({username: req.body.username});

  // register the new user with that new User object and the password
  // from the form data
  User.register(newUser, req.body.password, function(error,user) {
    if(error) {
      console.log(error);
      return res.render("register.ejs");
    }

    // if register sucessful, redirect to the models page
    passport.authenticate("local")(req,res,function() {
      res.redirect("/models")
    });
  });
});

// login form
router.get("/login", function(req,res) {
  res.render("login.ejs");
});

router.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/models",
    failureRedirect: "/login"
  }), function(req,res) {
});

// logout route
router.get("/logout", function(req,res) {
  req.logout();
  res.redirect("/models");
});

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;