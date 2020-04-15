const Model = require("../models/notification.model");
const User = require("../models/user.model");
exports.create = (req, res) => {
  try {
    let Notification = new Model({
      nguoidang: req.body.nguoidang,
      tentin: req.body.tentin,
      noidung: req.body.noidung,
      ngaydang: req.body.ngaydang,
      hinhanh: req.file.originalname,
    });
    Notification.save((err) => {
      if (err) {
        console.log(err);
        return;
      } else {
        res.redirect("/notification");
      }
    });
  } catch (error) {
    console.log("Vui lòng thêm hình");
  }
};

exports.delete = (req, res) => {
  Model.deleteOne({ _id: req.params.id }, (err, data) => {
    if (!err) {
      res.redirect("/notification");
    } else {
      console.log(err);
    }
  });
};
//notification
exports.getAll = async (req, res) => {
  Model.find()
    .lean()
    .exec((error, data) => {
      User.find()
        .lean()
        .exec((error1, data1) => {
          res.render("notification", { List: data, List1: data1 });
          if (error1) {
            log(error1);
          }
        });
      if (error) {
        log(error);
      }
    });
};
