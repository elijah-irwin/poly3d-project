var express = require("express");
var router = express.Router();
var Model3D = require("../schemas/models.js");
var Comment = require("../schemas/comments.js")

// ========== Comment Routes ==========
router.get("/models/:id/comments/new", isLoggedIn, function(req,res) {
  Model3D.findById(req.params.id, function(error, model) {
    if(error) console.log(error);
    else res.render("comments/newComment.ejs", {model:model});
  });
});

router.post("/models/:id/comments", isLoggedIn, function(req,res) {
  Model3D.findById(req.params.id, function(error,model) {
    if(error) {
      console.log(error);
      res.redirect("/models");
    } else {
      Comment.create(req.body.comment, function(error,comment) {
        if(error) console.log(error);
        else {
          model.comments.push(comment);
          model.save();
          res.redirect("/models/" + model._id);
        }
      });
    }
  });
});

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;