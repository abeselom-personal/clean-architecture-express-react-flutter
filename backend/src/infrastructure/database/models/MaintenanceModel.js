const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema(
  {
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    type: { type: String },
    date: { type: Date },
    cost: { type: Number },
    description: { type: String },
    garage: { type: mongoose.Schema.Types.ObjectId, ref: 'Garage' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Maintenance', maintenanceSchema);
