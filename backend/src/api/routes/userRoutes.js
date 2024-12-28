const express = require("express");
const {
    createUserHandler,
    getAllUserHandler,
    getUserHandler,
    updateUserHandler,
    searchUserHandler,
    deleteUserHandler
} = require("../controllers/userController");
const router = express.Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post("/",isAuthenticated, createUserHandler); // Create user
router.get("/",isAuthenticated, getAllUserHandler); // Get all user
router.get('/search', searchUserHandler); // Use the search controller
router.get("/:id",isAuthenticated, getUserHandler); // Get user by ID
router.put("/:id",isAuthenticated, updateUserHandler); // Update user
router.delete("/:id",isAuthenticated, deleteUserHandler); // Delete user

module.exports = router;
