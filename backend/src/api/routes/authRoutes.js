// src/api/routes/authRoutes.js
const express = require('express');
const { passport } = require('../middlewares/authMiddleware');
const User = require('../../infrastructure/database/models/UserModel');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', passport.authenticate('local', { session: true }), (req, res) => {
    res.json({ message: 'Login successful', user: req.user });
});

// Logout
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Logged out successfully' });
    });
});

module.exports = router;
