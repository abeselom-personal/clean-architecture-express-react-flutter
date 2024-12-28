const mongoose = require('mongoose');

// Vehicle Schema
const vehicleSchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    make: { type: String },
    year: { type: Number },
    status: { type: String, default: 'Available' },
    mileage: { type: Number },
    fuelType: { type: String },
    currentLocation: { type: String },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleGroup' },
    avatarPath: { type: String }, // Store image path in the database
  },
  { timestamps: true }
);

// Create a text index on the 'registrationNumber' field for search functionality
vehicleSchema.index({ registrationNumber: 'text' });

// Modify the toJSON method to add the full URL to the image path
vehicleSchema.methods.toJSON = function () {
  const vehicle = this.toObject();
  const host = process.env.HOST_URL || 'http://localhost:5000'; // Set your host URL here
  if (vehicle.avatarPath) {
    vehicle.avatarPath = `${host}/${vehicle.avatarPath}`; // Add the host to the image path
  }
  return vehicle;
};

module.exports = mongoose.model('Vehicle', vehicleSchema);
