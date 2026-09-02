const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject: String,
  message: String,           // VULN: Stored XSS payload yahan save hoga
  status: { type: String, default: 'Open' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SupportTicket', supportTicketSchema);