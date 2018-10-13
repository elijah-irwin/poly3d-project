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
  name: String,
  image: String
});

// assigning that schema to a var we can use to create objects
var model3d = mongoose.model("Model", modelSchema);

// creating a database object
model3d.create(
  {
    name: "Model 1",
    image: "https://www.lowpolylab.net/wp-content/uploads/edd/2017/02/low-poly-mill-1180x738.jpg" 
  }, function(error, model3d) {
    if(error) console.log(error);
    else {
      console.log("Created Model: ");
      console.log(model3d);
    }
  }
);

// test models for seeing on the page
var models = [
  {title: "Model 1", image: "https://www.lowpolylab.net/wp-content/uploads/edd/2017/02/low-poly-mill-1180x738.jpg"},
  {title: "Model 2", image: "https://static.turbosquid.com/Preview/001222/875/FB/sheep-low-poly-3D-model_D.jpg"},
  {title: "Model 3", image: "https://img1.cgtrader.com/items/687782/99c7347317/warrior-low-poly-3d-model-low-poly-max-obj-fbx.jpg"},
  {title: "Model 4", image: "https://i.pinimg.com/originals/e6/99/c3/e699c3f5c40213593f214c459374926a.jpg"},
  {title: "Model 5", image: "https://img1.cgtrader.com/items/129408/c41fed91e3/low-poly-elephant-3d-model-low-poly-max-obj-3ds-fbx-stl.jpg"},
  {title: "Model 6", image: "https://3dexport.com/items/2012/08/21/138679/123909/lowpoly_forest_pack_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1487492_o.png"}
];

// home page route
// localhost:3000
app.get("/", function(req,res) {
  res.render("home.ejs");
});

// models page route
// localhost:3000/models
app.get("/models", function(req,res) {
  res.render("models.ejs", {models: models});
});

// post route for adding newmodel to the array
app.post("/models", function(req,res) {
  var title = req.body.title;
  var image = req.body.image;
  var newModel = {title: title, image: image};
  models.push(newModel);
  res.redirect("/models");
});

// add new model page route
// localhost:3000/models/new
app.get("/models/new", function(req,res) {
  res.render("newModel.ejs");
});

// listen function for the app to determine where to host the server
// localhost:3000
app.listen(3000, process.env.IP, function() {
  console.log("Server has started sucessfully.")
});