const express = require("express");
const router = express.Router();
const Controller = require("../controllers/account.controllers");
const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.render("/account");
};

const Routes = (passport) => {
  router.get("/account", (req, res) => {
    if (req.isAuthenticated()) return Controller.getAll(req, res);
    res.render("layouts/login", {
      title: "Đăng nhập",
      layout: "main",
      message: req.flash("message", "Vui lòng đăng nhập"),
    });
  });

  return router;
};
module.exports = Routes;
