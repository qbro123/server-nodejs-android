const mongoose = require("mongoose");
const Accounts = new mongoose.Schema({
  fullname: { type: String },
  username: { type: String },
  phone: { type: String },
  email: { type: String },
  password: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Accounts", Accounts);
