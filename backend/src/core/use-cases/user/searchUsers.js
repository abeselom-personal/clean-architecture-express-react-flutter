const { searchUsers: searchUsersRepository } = require('../../../infrastructure/repositories/userRepository');

const searchUsers = async (searchQuery, page = 1, limit = 10) => {
    return await searchUsersRepository(searchQuery, page, limit);
};

module.exports = searchUsers;
