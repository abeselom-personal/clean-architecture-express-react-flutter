const { getAllUsers } = require('../../../infrastructure/repositories/userRepository');

const getAllUser = async () => {
    return await getAllUsers();
};

module.exports = getAllUser;
