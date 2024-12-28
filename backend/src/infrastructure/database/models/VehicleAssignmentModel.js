const mongoose = require('mongoose');

const vehicleAssignmentSchema = new mongoose.Schema(
  {
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    assignedDate: { type: Date, required: true },
    unassignedDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('VehicleAssignment', vehicleAssignmentSchema);
