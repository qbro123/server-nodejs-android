const mongoose = require("mongoose");
const User = new mongoose.Schema({
  fullname: { type: String },
  email: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("Registers", User);
