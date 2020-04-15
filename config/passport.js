const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
// ========================= LOGIN ========================================
const login = (passport) => {
  passport.use(
    "signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
          if (err) return done(err);
          if (!user)
            return done(
              null,
              false,
              req.flash("message", "Tài khoản không tồn tại")
            );
          if (!isValidPassword(user, password)) {
            return done(
              null,
              false,
              req.flash(
                "message",
                "Tài khoản hoặc mật khẩu đăng nhập không chính xác."
              )
            );
          }
          return done(null, user);
        });
      }
    )
  );
};

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};
const initSetup = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  login(passport);
};

module.exports = initSetup;
