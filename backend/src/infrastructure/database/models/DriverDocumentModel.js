const mongoose = require('mongoose');

const driverDocumentSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  document_name: { type: String, required: true },
  document_type: { type: String, required: true },
  uploaded_at: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('DriverDocument', driverDocumentSchema);
