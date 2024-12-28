require("dotenv").config();
const connectDB = require("./src/config/db");
const app = require("./src/app");

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
