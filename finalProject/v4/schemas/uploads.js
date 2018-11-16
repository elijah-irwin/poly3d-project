var mongoose = require("mongoose");


var uploadsSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: String,
    upload: String, // temp MUST CHANGE
  });

module.exports = mongoose.model("Upload", uploadsSchema);