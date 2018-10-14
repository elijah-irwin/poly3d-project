var mongoose  = require("mongoose");
var Model3D   = require("./schemas/models.js");
var Comment   = require("./schemas/comments.js");

// test data
var data = [
  {
    title: "Elephant", 
    image: "https://img-new.cgtrader.com/items/129408/c41fed91e3/low-poly-elephant-3d-model-low-poly-max-obj-3ds-fbx-stl.jpg",
    description: "Low-poly golden elephant."
  },
  {
    title: "Warrior", 
    image: "https://img2.cgtrader.com/items/687782/99c7347317/warrior-low-poly-3d-model-low-poly-max-obj-fbx.jpg",
    description: "Low-poly warrior with axe."
  },  
  {
    title: "Floating Island", 
    image: "https://www.lowpolylab.net/wp-content/uploads/edd/2017/02/low-poly-mill-1180x738.jpg",
    description: "Low-poly floating island with windmill and tree."
  }
]

function seedDB() {
  // removes all models
  Model3D.remove({}, function(error) {
    if(error) console.log(error);
    else {
      console.log("Models sucessfully removed.");

      // re-adds all test data
      data.forEach(function(seed) {
        Model3D.create(seed, function(error,model) {
          if(error) console.log(error);
          else {
            console.log("Model addded sucessfully.");

            // re-add the test comments on each model
            Comment.create({
              text: "This is a test comment.",
              author: "Mak"
            }, function(error, comment) {
              if(error) console.log(error);
              else {
                model.comments.push(comment);
                model.save();
                console.log("Sucessfully created new comment.");
              }
            });
          }
        });
      });
    }
  });
}

module.exports = seedDB;
 
