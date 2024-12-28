const mongoose = require('mongoose');

const fuelSchema = new mongoose.Schema(
  {
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    date: { type: Date, required: true },
    fuelType: { type: String, required: true }, // e.g., "Diesel", "Petrol"
    quantity: { type: Number, required: true },
    cost: { type: Number, required: true },
    location: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Fuel', fuelSchema);
