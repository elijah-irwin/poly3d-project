var express = require("express");
var router = express.Router();
var Model3D = require("../schemas/models.js");
var Comment = require("../schemas/comments.js")
var middleware = require("../middleware/index.js");

// ========== Comment Routes ==========
router.get("/models/:id/comments/new", middleware.isLoggedIn, function(req,res) {
  Model3D.findById(req.params.id, function(error, model) {
    if(error) console.log(error);
    else res.render("comments/newComment.ejs", {model:model});
  });
});

router.post("/models/:id/comments", middleware.isLoggedIn, function(req,res) {
  Model3D.findById(req.params.id, function(error,model) {
    if(error) {
      console.log(error);
      res.redirect("/models");
    } else {
      Comment.create(req.body.comment, function(error,comment) {
        if(error) console.log(error);
        else {
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();

          model.comments.push(comment);
          model.save();
          req.flash("success", "New comment added successfully.");
          res.redirect("/models/" + model._id);
        }
      });
    }
  });
});

module.exports = router;