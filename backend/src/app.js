const express = require("express");
const session = require("express-session");
const cors = require("cors");
const FileStore = require('session-file-store')(session);

const { JWT_SECRET } = require("./config/env");

const { passport } = require("./api/middlewares/authMiddleware");

const authRoutes = require("./api/routes/authRoutes");
const userRoutes = require('./api/routes/userRoutes');
const vehicleRoutes = require('./api/routes/vehicleRoutes');

const app = express();

// Middleware
app.use(express.json());

// for Development 
app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // Allow cookies and credentials
  })
);
app.use(
  session({
    store: new FileStore({ path: './sessions' }),  // Path to store session files
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,  // Set to `true` if using HTTPS
      maxAge: 3600000, // 1 hour
    },
  })
);




// Vehicle routes
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/uploads', express.static('uploads'));
app.use("/auth", authRoutes);
app.use('/users', userRoutes);
app.use('/vehicles', vehicleRoutes);

module.exports = app;
