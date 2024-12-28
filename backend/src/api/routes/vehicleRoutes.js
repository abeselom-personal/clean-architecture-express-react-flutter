const express = require("express");
const vehicleController = require("../controllers/vehicleController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Create a vehicle
router.post("/", isAuthenticated,upload.single('avatar'),  vehicleController.createVehicle);

// Get all vehicles (with pagination and filtering)
router.get("/", isAuthenticated, vehicleController.getVehicles);

// Get a single vehicle by ID
router.get("/:id", isAuthenticated, vehicleController.getVehicleById);

// Update a vehicle
router.put("/:id", isAuthenticated, vehicleController.updateVehicle);

// Delete a vehicle
router.delete("/:id", isAuthenticated, vehicleController.deleteVehicle);

module.exports = router;
