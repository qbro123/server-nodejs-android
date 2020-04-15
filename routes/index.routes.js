const express = require("express");
const router = express.Router();

//setup
const upload = require("../config/multer");

//controller
const Users = require("../controllers/user.controllers");
const Account = require("../controllers/account.controllers");
const Product = require("../controllers/product.controllers");
const Notification = require("../controllers/notification.controller");
//api
const ApiUser = require("../api/user-api");
const ApiProduct = require("../api/product-api");
const ApiNotification = require("../api/notification-api");
//check token
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
};

//router
const Routes = (passport) => {
  router.get("/", (req, res) => {
    if (req.isAuthenticated()) return res.redirect("index");
    res.render("layouts/login", {
      title: "Đăng nhập",
      layout: "main",
      message: req.flash("message"),
    });
  });

  router.post(
    "/index",
    passport.authenticate("signin", {
      successRedirect: "/index",
      failureRedirect: "/",
      failureFlash: true,
    })
  );

  router.post(
    "/notification/tao-tin-moi",
    isAuthenticated,
    upload.single("image"),
    Notification.create
  );

  router.get("/notification/delete/:id", isAuthenticated, Notification.delete); //
  router.post("/user/create-user", isAuthenticated, Users.create);
  router.post("/user/edituser", isAuthenticated, Users.edit);
  router.get("/index", isAuthenticated, Users.login);
  router.get("/signout", Users.signout);
  router.get("/user/edituser/:id", isAuthenticated, Users.getUser);
  router.get("/user/delete/:id", isAuthenticated, Users.delete);
  router.post(
    "/account/new-account",
    isAuthenticated,
    upload.single("image"),
    Account.create
  );
  router.get("/account/edit/:id", isAuthenticated, Account.getAccountById);
  router.post(
    "/account/edit/",
    isAuthenticated,
    upload.single("image"),
    Account.editAccountById
  );
  router.get("/account/delete/:id", isAuthenticated, Account.delete);
  router.get("/danh-sach-thuoc/add-product/", isAuthenticated, (req, res) => {
    res.render("addProduct");
  });

  router.post(
    "/danh-sach-thuoc/add-product/",
    upload.single("image"),
    // isAuthenticated,
    Product.create
  );
  router.get(
    "/danh-sach-thuoc/details/:id",
    isAuthenticated,
    Product.getDetailsProductById
  );
  router.get(
    "/danh-sach-thuoc/edit/:id",
    isAuthenticated,
    Product.getInfoProductById
  );

  router.post(
    "/danh-sach-thuoc/edit/",
    upload.single("image"),
    isAuthenticated,
    Product.editProductById
  );
  router.get("/danh-sach-thuoc/delete/:id", isAuthenticated, Product.delete);
  // ======================== API ====================
  //API Account
  router.get("/api/private/account/", ApiUser.getUserByEmail);
  router.post("/api/account/login", ApiUser.getToken);
  router.post("/api/account/register", ApiUser.getRegister);
  router.post("/api/upload/", upload.single("image", ApiUser.uploadImage));
  //API PRODUCT
  router.get("/api/product/all", ApiProduct.getall);
  router.get("/api/product/new-edit", ApiProduct.getNewEdit);
  //API NOTIFICATION
  router.get("/api/notification/", ApiNotification.getNotificationAll);
  router.get(
    "/api/notification/:ngaydang",
    ApiNotification.getNotificationById
  );
  return router;
};

module.exports = Routes;
