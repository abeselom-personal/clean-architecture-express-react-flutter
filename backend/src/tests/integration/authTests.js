const axios = require('axios');
const { startServer, stopServer } = require('../utils/testHelpers');

const testAuth = async () => {
    try {
        // Start the server for testing
        await startServer();

        // Register a user
        const registerResponse = await axios.post('http://localhost:3000/auth/register', {
            username: 'testuser',
            password: 'securepassword123',
        });
        console.log('Register Response:', registerResponse.data);

        // Login with the user
        const loginResponse = await axios.post('http://localhost:3000/auth/login', {
            username: 'testuser',
            password: 'securepassword123',
        });
        console.log('Login Response:', loginResponse.data);

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    } finally {
        await stopServer();
    }
};

testAuth();
