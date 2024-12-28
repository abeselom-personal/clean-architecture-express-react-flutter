const UserModel = require('../database/models/UserModel');

const createUser = async (userData) => {
    const newUser = new UserModel(userData);
    return await newUser.save();
};

const getUserById = async (id) => {
    return await UserModel.findById(id);
};

const getAllUsers = async () => {
    return await UserModel.find();
};

const updateUser = async (id, updatedData) => {
    return await UserModel.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteUser = async (id) => {
    return await UserModel.findByIdAndDelete(id);
};

const searchUsers = async (searchQuery, page = 1, limit = 10) => {
    const query = {};

    if (searchQuery.username) {
        query.username = { $regex: searchQuery.username, $options: 'i' }; 
    }

    if (searchQuery.email) {
        query.email = { $regex: searchQuery.email, $options: 'i' };
    }

    const skip = (page - 1) * limit; 

    const users = await UserModel.find(query).skip(skip).limit(limit);
    console.log("🚀 ~ searchUsers ~ users:", users)
    const total = await UserModel.countDocuments(query); 
    console.log("🚀 ~ searchUsers ~ total:", total)

    return { users, total };
};

module.exports = { createUser, getUserById, getAllUsers, updateUser, deleteUser, searchUsers };
