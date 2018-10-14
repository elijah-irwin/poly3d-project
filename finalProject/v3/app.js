// requiring packages we need to make the app function
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Model3D     = require("./schemas/models.js");
    seedDB      = require("./seed.js");

// connecting to the database
mongoose.connect("mongodb://localhost/poly3d", {useNewUrlParser: true});

// enables the body parser for json 
app.use(bodyParser.urlencoded({extended: true}));

seedDB();

// home page route
// localhost:3000
app.get("/", function(req,res) {
  res.render("home.ejs");
});

// models page route
// localhost:3000/models
app.get("/models", function(req,res) {
  
  // searching for all the models in the database
  Model3D.find({}, function(error, allModels) {
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
  Model3D.create(newModel, function(error, new3dModel) {
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
  Model3D.findById(req.params.id).populate("comments").exec(function(error, foundModel) {
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