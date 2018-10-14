// requiring packages we need to make the app function
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// connecting to the database
mongoose.connect("mongodb://localhost/poly3d", {useNewUrlParser: true});

// enables the body parser for json 
app.use(bodyParser.urlencoded({extended: true}));

// test schema setup, essentially a model for a database object
var modelSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String
});

// assigning that schema to a var we can use to create objects
var Model3d = mongoose.model("Model", modelSchema);

// creating a database object
// Model3d.create(
//   {
//     title: "Model 1",
//     image: "https://www.lowpolylab.net/wp-content/uploads/edd/2017/02/low-poly-mill-1180x738.jpg",
//     description: "I can't remember what this image is so this is a filler description." 
//   }, function(error, model3d) {
//     if(error) console.log(error);
//     else {
//       console.log("Created Model: ");
//       console.log(model3d);
//     }
//   }
// );

// home page route
// localhost:3000
app.get("/", function(req,res) {
  res.render("home.ejs");
});

// models page route
// localhost:3000/models
app.get("/models", function(req,res) {
  
  // searching for all the models in the database
  Model3d.find({}, function(error, allModels) {
    if(error) console.log(error);
    else {
      res.render("models.ejs", {models: allModels});
    }
  });
});

// post route for adding newmodel to the array
app.post("/models", function(req,res) {
  var title = req.body.title;
  var image = req.body.image;
  var description = req.body.description;
  var newModel = {title: title, image: image, description: description};
  Model3d.create(newModel, function(error, new3dModel) {
    if(error) console.log(error);
    else {
      res.redirect("/models");
    }
  });
});

// add new model page route
// localhost:3000/models/new
app.get("/models/new", function(req,res) {
  res.render("newModel.ejs");
});

// route that will show more info about a specific model
app.get("/models/:id", function(req,res) {
  Model3d.findById(req.params.id, function(error, foundModel) {
    if(error) console.log(error);
    else {
      res.render("show.ejs", {model: foundModel});
    }
  });
});

// listen function for the app to determine where to host the server
// localhost:3000
app.listen(3000, process.env.IP, function() {
  console.log("Server has started sucessfully.")
});