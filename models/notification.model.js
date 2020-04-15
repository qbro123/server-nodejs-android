const mongoose = require("mongoose");
const Notification = new mongoose.Schema({
  nguoidang: { type: String },
  tentin: { type: String },
  noidung: { type: String },
  ngaydang: { type: String },
  hinhanh: { type: String },
});

module.exports = mongoose.model("notification", Notification);
