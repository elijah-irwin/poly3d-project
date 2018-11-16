var mongoose = require("mongoose");


var upoloadsSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: String,
    upload: String, // temp MUST CHANGE
  });

module.exports = mongoose.model("Upload", upoloadsSchema);