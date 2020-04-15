//import
const http = require("http");
const express = require("express");
const expressSession = require("express-session");
const app = express();
const PORT = 3000;
const passport = require("passport");
const handlebars = require("express-handlebars");
const flash = require("connect-flash");
const connectDB = require("./config/database.js");

//routes
const Account = require("./routes/account.routes");
const Index = require("./routes/index.routes");
const Product = require("./routes/product.routes");
const Notification = require("./routes/notification.routes");
const configPassport = require("./config/passport.js");
//user
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Kết nối Mongo DB
connectDB();
//config template engine
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    defaultView: "main",
    layoutsDir: __dirname + "/views/layouts/",
  })
);
app.set("view engine", "hbs");

//config passport
app.use(
  expressSession({ secret: "login", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
configPassport(passport);
//router
app.use("/", Index(passport));
app.get("/danh-sach-thuoc", Product(passport));
app.get("/account", Account());
app.get("/notification", Notification());
app.get("*", (req, res) => {
  res.render("404.hbs", {
    title: "404 - Page not found",
    layout: "main",
  });
});

//start server
http
  .createServer(app)
  .listen(PORT, () => console.log(`Server listening on port ${PORT}`));
