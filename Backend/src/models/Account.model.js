const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  account_number: String,
  account_type: { type: String, enum: ['Savings','Current','Business'] },
  balance: Number,
  status: { type: String, default: 'Active' }
});

module.exports = mongoose.model('Account', accountSchema);