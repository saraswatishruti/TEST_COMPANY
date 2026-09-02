const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,          // bcrypt hash store hoga
  role: { type: String, enum: ['customer','employee','manager','admin'], default: 'customer' },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);