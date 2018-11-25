var express = require("express");
var router = express.Router();
var Model3D = require("../schemas/models.js");
var middleware = require("../middleware/index.js");

// localhost:3000/viewer
router.get("/viewer/:id", function(req,res) {
    Model3D.findById(req.params.id, function(error, foundModel) {
        res.render("../MV/WebGL.ejs", {model: foundModel});
        
    });
  });

module.exports = router;