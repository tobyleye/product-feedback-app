const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    let user = await User.findById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "incorrect username" });
        }
        user.comparePassword(password, (result) => {
          if (!result)
            return done(null, false, { message: "incorrect password" });
          return done(null, user);
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

exports.signup = async function ({ email, fullname, username, password, req }) {
  let user = await new User({ email, fullname, username, password }).save();
  return new Promise((resolve, reject) => {
    req.login(user, (err) => {
      if (err) reject(err);
      else resolve(user);
    });
  });
};

exports.login = async function ({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", (err, user) => {
      if (!user) reject("invalid credentials");
      req.login(user, () => resolve(user))
    })({ body: { email, password } });
  });
};
