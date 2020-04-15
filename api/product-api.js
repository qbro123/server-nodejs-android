const Model = require("../models/product.model");
//get all product
exports.getall = async (req, res) => {
  try {
    var result = await Model.find();
    res.send(result.reverse());
  } catch (error) {
    res.status(500).send(error);
  }
};
//get all product
exports.getNewEdit = async (req, res) => {
  try {
    var result = await Model.find();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
