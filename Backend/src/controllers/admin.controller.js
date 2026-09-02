const express = require('express');
const User = require('../models/User.Model');
const AuditLog = require('../models/auditLog.model');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

// GET /api/admin/users
// VULN: Sensitive Data Exposure — password hash and internal fields returned
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find(); // Yahan .select('-password') hona chahiye tha, par nahi hai!
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/audit-logs
router.get('/audit-logs', auth, async (req, res) => {
  try {
    const logs = await AuditLog.find().populate('user_id', 'name email role');
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;