var mongoose = require("mongoose");

// test schema setup, essentially a model for a database object
var modelSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

// assigning that schema to a var we can use to create objects
// "Model" is the collections name, very important variable that 
// determines which database collections it will be stored in
module.exports = mongoose.model("Model", modelSchema);