const { deleteUser: deleteUserRepository } = require('../../../infrastructure/repositories/userRepository');

const deleteUser = async (id) => {
    return await deleteUserRepository(id);
};

module.exports = deleteUser;
