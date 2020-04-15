const mongoose = require("mongoose");
const Comment = new mongoose.Schema({
  id_thuoc: { type: String },
  id_account: { type: String },
  comment: { type: String },
});

module.exports = mongoose.model("Comment", Comment);
