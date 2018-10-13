var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var models = [
  {title: "Model 1", image: "https://www.lowpolylab.net/wp-content/uploads/edd/2017/02/low-poly-mill-1180x738.jpg"},
  {title: "Model 2", image: "https://static.turbosquid.com/Preview/001222/875/FB/sheep-low-poly-3D-model_D.jpg"},
  {title: "Model 3", image: "https://img1.cgtrader.com/items/687782/99c7347317/warrior-low-poly-3d-model-low-poly-max-obj-fbx.jpg"},
  {title: "Model 4", image: "https://i.pinimg.com/originals/e6/99/c3/e699c3f5c40213593f214c459374926a.jpg"},
  {title: "Model 5", image: "https://img1.cgtrader.com/items/129408/c41fed91e3/low-poly-elephant-3d-model-low-poly-max-obj-3ds-fbx-stl.jpg"},
  {title: "Model 6", image: "https://3dexport.com/items/2012/08/21/138679/123909/lowpoly_forest_pack_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1487492_o.png"}
];

app.get("/", function(req,res) {
  res.render("home.ejs");
});

app.get("/models", function(req,res) {
  res.render("models.ejs", {models: models});
});

app.post("/models", function(req,res) {
  var title = req.body.title;
  var image = req.body.image;
  var newModel = {title: title, image: image};
  models.push(newModel);
  res.redirect("/models");
});

app.get("/models/new", function(req,res) {
  res.render("newModel.ejs");
});

app.listen(3000, process.env.IP, function() {
  console.log("Server has started sucessfully.")
});