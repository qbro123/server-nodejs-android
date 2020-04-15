//import
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Notification = require("../models/notification.model");
//export
exports.login = async (req, res) => {
  let users = await User.find().select("-password").lean();
  let info_user = req.user.toJSON();
  let newData = users.map((item, index) => ({
    ...item,
    noNum: index,
  }));
  res.render("index", {
    title: "Admin",
    layout: "main",
    userList: newData,
    info_user: info_user,
  });
};

exports.create = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return done(err);
    if (user) {
      return console.log("Email hasn't been verified");
    } else {
      let userInfo = new User();
      userInfo.email = req.body.email;
      userInfo.fullname = req.body.fullname;
      userInfo.password = createHash(req.body.password);
      userInfo.save((err) => {
        if (err) {
          console.log(err);
          return;
        } else {
          res.redirect("/index");
        }
      });
    }
  });
};

exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .lean()
    .exec(function (err, user) {
      if (!err) {
        res.render("edituser", { User: user });
      }
    });
};

exports.edit = (req, res) => {
  Notification.find((err, data) => {
    for (var i = 0; i < data.length; i++) {
      Notification.findOneAndUpdate(
        { nguoidang: data[i].nguoidang },
        {
          $set: {
            nguoidang: req.body.fullname,
          },
        }
      );
    }
  });
  User.updateOne(
    { _id: req.body._id },
    {
      $set: {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
      },
    },
    (err, data) => {
      if (!err) {
        res.redirect("/");
      } else {
        req.flash("message", "Update fail");
      }
    }
  );
};

// exports.delete = (req, res) => {
//   User.deleteOne({ _id: req.params.id }, (err, data) => {
//     if (!err) {
//       res.redirect("/index");
//     } else {
//       console.log(err);
//     }
//   });
// };

exports.delete = (req, res) => {
  User.findOneAndRemove({ theloai: req.params.theloai }, (err, data) => {
    if (!err) {
      res.redirect("/index");
    } else {
      console.log(err);
    }
  });
};

exports.signout = (req, res) => {
  req.logout();
  res.redirect("/");
};

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
