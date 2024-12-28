const mongoose = require('mongoose');
const app = require('../../app');
const { MONGO_URI } = require('../../config/env');
const http = require('http');

let server;

const startServer = async () => {
    await mongoose.connect(MONGO_URI);
    server = app.listen(3000, () => console.log('Test server running on port 3000'));
};

const stopServer = async () => {
    await mongoose.connection.close();
    if (server) {
        server.close(() => console.log('Test server stopped'));
    }
};

module.exports = { startServer, stopServer };
