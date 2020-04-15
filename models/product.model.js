const mongoose = require("mongoose");
const Pill = new mongoose.Schema({
  sodangky: { type: String },
  tenthuoc: { type: String },
  phanloai: { type: String },
  tuoitho: { type: String },
  hoatchat: { type: String },
  dangbaoche: { type: String },
  quycach: { type: String },
  ctysx: { type: String },
  tieuchuan: { type: String },
  ctydk: { type: String },
  ngaykekhai: { type: String },
  donvi: { type: String },
  giakekhai: { type: String },
  dvt: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Pill", Pill);
