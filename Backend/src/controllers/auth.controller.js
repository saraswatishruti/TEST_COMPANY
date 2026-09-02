const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.Model');

const router = express.Router();

// POST /api/auth/register
// VULN: Brute Force / Weak Auth — no password complexity check on register
router.post('/register', async (req, res) => {
  try {
    // VULN: Privilege Escalation — role taken directly from client input
    const { name, email, password, role } = req.body; 

    // VULN: Weak Practices — weak bcrypt salt rounds (using 4 instead of 10-12)
    const hashedPassword = await bcrypt.hash(password, 4);

    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role // User can send "role": "admin" in JSON to become admin!
    });

    // VULN: Weak Session Management — 7-day expiry
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/login
// VULN: Brute Force — no rate limit / lockout on login attempts
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // VULN: Outdated / Weak Practices — Sensitive data logged to console
    console.log('Login attempt with password:', password); 

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/logout
// VULN: Weak Session Management — logout doesn't invalidate the token
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' }); // Token is technically still valid until expiry
});

module.exports = router;