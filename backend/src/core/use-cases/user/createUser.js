const { createUser: createUserRepository } = require('../../../infrastructure/repositories/userRepository');

const createUser = async (userData) => {
    return await createUserRepository(userData);
};

module.exports = createUser;
