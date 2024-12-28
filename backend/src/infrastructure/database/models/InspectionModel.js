const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  date: { type: Date, required: true },
  result: { type: String },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Inspection', inspectionSchema);
