// Importing use cases for user operations
const createUser = require('../../core/use-cases/user/createUser');
const getUser = require('../../core/use-cases/user/getUser');
const getAllUsers = require('../../core/use-cases/user/getAllUsers'); // Corrected the reference to `getAllUsers`
const updateUser = require('../../core/use-cases/user/updateUser');
const deleteUser = require('../../core/use-cases/user/deleteUser');
const searchUsers = require('../../core/use-cases/user/searchUsers');

// Create a new user
const createUserHandler = (req, res) => {
    createUser(req.body)
        .then((user) => res.status(201).json(user))
        .catch((err) => res.status(400).json({ error: err.message }));
};

// Get all users
const getAllUserHandler = (req, res) => {
    getAllUsers()  // Assuming `getAllUsers` fetches all users
        .then((users) => {
            if (!users || users.length === 0) {
                return res.status(404).json({ message: 'No users found' });
            }
            res.status(200).json(users);
        })
        .catch((err) => res.status(400).json({ error: err.message }));
};

// Get a specific user by ID
const getUserHandler = (req, res) => {
    getUser(req.params.id)
        .then((user) => {
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        })
        .catch((err) => res.status(400).json({ error: err.message }));
};

// Update user information
const updateUserHandler = (req, res) => {
    updateUser(req.params.id, req.body)
        .then((updatedUser) => {
            if (!updatedUser) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(updatedUser);
        })
        .catch((err) => res.status(400).json({ error: err.message }));
};

// Delete a user
const deleteUserHandler = (req, res) => {
    deleteUser(req.params.id)
        .then((result) => {
            if (!result) return res.status(404).json({ message: 'User not found' });
            res.status(200).json({ message: 'User deleted successfully' });
        })
        .catch((err) => res.status(400).json({ error: err.message }));
};
const searchUserHandler = (req, res) => {
    const { username, email } = req.query; // Extract search parameters from query string
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided

    searchUsers({ username, email }, page, limit)
        .then(({ users, total }) => {
            const totalPages = Math.ceil(total / limit); // Calculate total pages
            res.status(200).json({
                users,
                total,
                totalPages,
                currentPage: page
            });
        })
        .catch((err) => res.status(400).json({ error: err.message }));
};


// Export each function individually
module.exports = {
    createUserHandler,
    getAllUserHandler,
    getUserHandler,
    updateUserHandler,
    deleteUserHandler,
    searchUserHandler
};
