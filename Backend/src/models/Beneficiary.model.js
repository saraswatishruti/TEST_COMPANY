const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  account_number: String,
  bank_name: String
});

module.exports = mongoose.model('Beneficiary', beneficiarySchema);