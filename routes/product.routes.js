const express = require("express");
// const User = require("../models/user");
const router = express.Router();
const Product = require("../controllers/product.controllers");
//check login
const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.render("/danh-sach-thuoc");
};

const Routes = () => {
  router.get("/danh-sach-thuoc", (req, res) => {
    if (req.isAuthenticated()) return Product.getAll(req, res);
    res.render("layouts/login", {
      title: "Đăng nhập",
      layout: "main",
      message: req.flash("message", "Vui lòng đăng nhập"),
    });
  });

  return router;
};
module.exports = Routes;
