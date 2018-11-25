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
  var newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profilePicture: "https://img2.cgtrader.com/items/810652/dbc7c52552/large/low-poly-tree-3d-model-low-poly-animated-rigged-obj-3ds-fbx-blend-dae-mtl.png",
    bannerPicture: "https://cdn1.epicgames.com/ue/product/Screenshot/LowPolySeriesLandscape_Screenshot_04-1920x1080-bfd8f8bff82a6ac07417847b10f1bbd9.jpg",
    bio: "There's nothing here!",
    dateJoined: new Date()   
  });

  // register the new user with that new User object and the password
  // from the form data
  User.register(newUser, req.body.password, function(error,user) {
    if(error) {
      req.flash("error", err.message + ".");
      return res.render("register.ejs");
    }

    // if register sucessful, redirect to the models page
    passport.authenticate("local")(req,res,function() {
      req.flash("success", user.username + " has successfully logged in.");
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
    failureRedirect: "/login",
    successFlash: "Successfully logged in.",
    failureFlash: true
  }), function(req,res) {
});

// logout route
router.get("/logout", function(req,res) {
  req.logout();
  req.flash("success", "Successfully logged out.");
  res.redirect("/models");
});

module.exports = router;