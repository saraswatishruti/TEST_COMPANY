const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  recipient: String,
  gateway: String,
  status: { type: String, default: 'Processed' },
  reference: String
});

module.exports = mongoose.model('Payment', paymentSchema);