const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  type: { type: String },
  company_name: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  cost: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Insurance', insuranceSchema);
