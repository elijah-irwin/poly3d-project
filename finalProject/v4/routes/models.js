var express = require("express");
var router = express.Router();
var Model3D = require("../schemas/models.js");

// models page route
// localhost:3000/models
router.get("/models", function(req,res) {
  // searching for all the models in the database
  Model3D.find({}, function(error, allModels) {
    if(error) console.log(error);
    else {
      res.render("models/models.ejs", {models: allModels});
    }
  });
});

// post route for adding newmodel
router.post("/models", isLoggedIn, function(req,res) {
  var title = req.body.title;
  var image = req.body.image;
  var description = req.body.description;
  var author = {id: req.user._id, username: req.user.username}
  var newModel = {
    title: title, 
    image: image, 
    description: description,
    author: author
  };
  Model3D.create(newModel, function(error, new3dModel) {
    if(error) console.log(error);
    else {
      console.log(new3dModel);
      res.redirect("/models");
    }
  });
});

// add new model page route
// localhost:3000/models/new
router.get("/models/new", isLoggedIn, function(req,res) {
  res.render("models/newModel.ejs");
});

// route that will show more info about a specific model
router.get("/models/:id", function(req,res) {
  Model3D.findById(req.params.id).populate("comments").exec(function(error, foundModel) {
    if(error) console.log(error);
    else {
      res.render("models/show.ejs", {model: foundModel});
    }
  });
});

// EDIT MODEL ROUTE
router.get("/models/:id/edit", function(req,res) {
  Model3D.findById(req.params.id, function(error, foundModel) {
    if(error) res.redirect("/models");
    else res.render("models/edit.ejs", {model: foundModel});
  });
});

// UPDATE MODEL ROUTE
router.put("/models/:id", function(req,res) {
  Model3D.findByIdAndUpdate(req.params.id, req.body.model, 
    function(error, updatedModel) {
      if(error) res.redirect("/models");
      else {
        res.redirect("/models/" + req.params.id);
      }
    });
});

// DESTROY MODEL ROUTE
router.delete("/models/:id", function(req,res) {
  Model3D.findByIdAndRemove(req.params.id, function(error) {
    if(error) res.redirect("/models");
    else res.redirect("/models");
  })
});

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;