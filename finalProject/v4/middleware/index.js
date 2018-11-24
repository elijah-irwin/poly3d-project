var Model3D = require("../schemas/models.js")

var middlewareObj = {};

middlewareObj.checkModelOwnership = function(req,res,next) {
  if(req.isAuthenticated()) {
    Model3D.findById(req.params.id, function(error, foundModel) {
      if(error) res.redirect("back");
      else {

        if (!foundCampground) {
          req.flash("error", "Item not found.");
          return res.redirect("back");
        }

        if(foundModel.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You dont have the permissions to do that.");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "Please login to do that.");
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function(req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "Pleas login to do that.");
    res.redirect("/login");
  } 
}

module.exports = middlewareObj;