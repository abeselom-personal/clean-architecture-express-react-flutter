const mongoose = require('mongoose');

const garageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    contactInfo: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Garage', garageSchema);
