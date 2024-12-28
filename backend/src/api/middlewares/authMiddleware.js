const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../infrastructure/database/models/UserModel');

passport.use(
    new LocalStrategy(
      {
        usernameField: 'identifier', // Accepts either email or username
        passwordField: 'password',   // The password field
      },
      async (identifier, password, done) => {
        try {
          // Search for user by email or username
          const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
          });
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          // Compare passwords
          const isMatch = await user.comparePassword(password);
          if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
          }
  
          // Successfully authenticated
          return done(null, user);
        } catch (err) {
          return done(err); // Handle errors
        }
      }
    )
  );
  
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // Proceed to the next middleware or controller
    }
    res.status(401).json({ error: 'Unauthorized: Please log in' });
};

module.exports = { passport, isAuthenticated };


