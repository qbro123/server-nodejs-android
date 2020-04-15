const Model = require("../models/account.model");

exports.create = (req, res) => {
  try {
    let Account = new Model({
      fullname: req.body.fullname,
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      image: req.file.originalname,
    });

    Account.save(function (err) {
      if (err) {
        console.log(err);
        return;
      } else {
        res.redirect("/account");
      }
    });
  } catch (error) {
    let Account = new Model({
      fullname: req.body.fullname,
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    });

    Account.save(function (err) {
      if (err) {
        console.log(err);
        return;
      } else {
        res.redirect("/account");
      }
    });
  }
};
exports.delete = (req, res) => {
  Model.deleteOne({ _id: req.params.id }, (err, data) => {
    if (!err) {
      res.redirect("/account");
    } else {
      console.log(err);
    }
  });
};
exports.getAll = (req, res) =>
  Model.find({})
    .lean()
    .exec(function (error, data) {
      let newData = data.map((item, index) => ({
        ...item,
        noNum: index,
      }));
      res.render("account", { List: newData, Host: req.headers.host });
      if (error) {
        log(error);
      }
    });

exports.getAccountById = (req, res) => {
  Model.findById(req.params.id)
    .lean()
    .exec((err, data) => {
      if (!err) {
        res.render("editAccount", { Model: data });
      }
    });
};

exports.editAccountById = async (req, res) => {
  try {
    await Model.updateOne(
      { _id: req.body._id },
      {
        $set: {
          fullname: req.body.fullname,
          username: req.body.username,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password,
          image: req.file.originalname,
        },
      },
      (err, doc) => {
        if (!err) {
          res.redirect("/account");
        } else {
          console.log("Edit Failed");
        }
      }
    );
  } catch (error) {
    await Model.updateOne(
      { _id: req.body._id },
      {
        $set: {
          fullname: req.body.fullname,
          username: req.body.username,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password,
          image: req.body.imagehide,
        },
      },
      (err, doc) => {
        if (!err) {
          res.redirect("/account");
        } else {
          console.log("Edit Failed");
        }
      }
    );
    console.log(error);
  }
};
