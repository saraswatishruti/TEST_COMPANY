const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  from_account: String,
  to_account: String,
  amount: Number,
  status: { type: String, enum: ['Success','Failed','Pending'], default: 'Success' },
  remarks: String,           // VULN: Stored XSS payload yahan save hoga
  txn_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);