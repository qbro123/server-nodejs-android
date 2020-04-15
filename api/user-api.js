const Model = require("../models/account.model");

//get account by email
exports.getUserByEmail = async (req, res) => {
  try {
    var account = await Model.find(req.params);
    res.send(account);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getToken = async (req, res) => {
  try {
    const AccountInfo = await Model.findOne({ username: req.body.username });
    const CheckToken = { status: true, message: "Account successfully" };
    if (!AccountInfo) {
      const ObjectNew = {
        status: false,
        message: "Account not found",
      };
      res.send(ObjectNew);
    } else {
      if (AccountInfo.password == req.body.password) {
        const ObjectNew = {
          _id: AccountInfo._id,
          fullname: AccountInfo.fullname,
          username: AccountInfo.username,
          phone: AccountInfo.phone,
          email: AccountInfo.email,
          image: AccountInfo.image,
          status: CheckToken.status,
          message: CheckToken.message,
        };
        res.send(ObjectNew);
      } else {
        const ObjectNew = {
          status: false,
          message: "Password is incorrect",
        };
        res.send(ObjectNew);
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.uploadImage = async (req, res) => {
  await Model.updateOne(
    { _id: req.body._id },
    {
      $set: {
        image: req.file.originalname,
      },
    },
    (err, doc) => {
      if (!err) {
        res.send({ status: true, message: "Image uploaded!!" });
      } else {
        res.send({ status: false, message: "Image not uploaded!!!" });
      }
    }
  );
};

exports.getRegister = (req, res) => {
  Model.findOne({ username: req.body.username }, (err, user) => {
    if (err) return done(err);
    if (user) {
      return res.send({ status: false, message: "Account already exists" });
    } else {
      let Account = new Model({
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password,
        phone: "Chưa cập nhật",
        email: "Chưa cập nhật",
        image: "Chưa cập nhật",
      });
      Account.save(function (err) {
        if (err) {
          console.log(err);
          return;
        } else {
          res.send({ status: true, message: "Create account successfully" });
        }
      });
    }
  });
};
