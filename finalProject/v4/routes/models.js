var express = require("express");
var router = express.Router();
var Model3D = require("../schemas/models.js");

// models page route
// localhost:3000/models
router.get("/models", function(req,res) {
  // searching for all the models in the database

      res.render("models/models.ejs", {models: allModels});
    
});

// post route for adding newmodel to the array
router.post("/models", function(req,res) {
  var title = req.body.title;
  var image = req.body.image;
  var description = req.body.description;
  var newModel = {title: title, image: image, description: description};
  Model3D.create(newModel, function(error, new3dModel) {
    if(error) console.log(error);
    else {
      res.redirect("/models");
    }
  });
});

// add new model page route
// localhost:3000/models/new
router.get("/models/new", function(req,res) {
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

module.exports = router;