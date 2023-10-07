const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./models/User");

// Use local strategy to authenticate users
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        // Find the user with the given email
        const user = await User.findOne({ email });

        // If user doesn't exist, return error message
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }

        // Check if the password matches the user's hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // If the password is incorrect, return error message
        if (!isMatch) {
          return done(null, false, { message: "Invalid email or password" });
        }

        // Otherwise, return the authenticated user
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize the user id to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user id from session and return the user object
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "User not authenticated" });
};

module.exports = { passport, isAuthenticated };
