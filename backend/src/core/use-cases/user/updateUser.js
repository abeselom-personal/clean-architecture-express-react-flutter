const { updateUser: updateUserRepository } = require('../../../infrastructure/repositories/userRepository');

const updateUser = async (id, updatedData) => {
    return await updateUserRepository(id, updatedData);
};

module.exports = updateUser;
