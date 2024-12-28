const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  description: { type: String },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
