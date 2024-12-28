const { getUserById } = require('../../../infrastructure/repositories/userRepository');

const getUser = async (id) => {
    return await getUserById(id);
};

module.exports = getUser;
