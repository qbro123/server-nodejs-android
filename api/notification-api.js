const Model = require("../models/notification.model");

exports.getNotificationAll = (req, res) =>
  Model.find()
    .lean()
    .exec((error, data) => {
      res.send(data.reverse());
      if (error) {
        log(error);
      }
    });

exports.getNotificationById = (req, res) => {
  Model.findById(req.params.ngaydang)
    .lean()
    .exec((err, data) => {
      if (!err) {
        res.send(data);
      }
    });
};
