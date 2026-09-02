const express = require('express');
const SupportTicket = require('../models/supportTicket.model');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { subject, message } = req.body;
    // VULN: Stored XSS — message stored exactly as submitted, without sanitization
    const ticket = await SupportTicket.create({ user_id: req.user._id, subject, message });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const tickets = await SupportTicket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;