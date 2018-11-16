var express = require("express");
var router = express.Router();
var Upload = require("../schemas/uploads.js");

// models page route
// localhost:3000/models
router.get("/uploads", function(req,res) {
  // searching for all the models in the database
      res.render("uploads/uploads.ejs"); 
});


module.exports = router;