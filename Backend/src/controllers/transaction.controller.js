const express = require('express');
const Transaction = require('../models/Transaction.model');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

// POST /api/transactions
router.post('/', auth, async (req, res) => {
  try {
    const { from_account, to_account, amount, remarks } = req.body;
    // VULN: Stored XSS — remarks stored exactly as submitted, no sanitization
    const transaction = await Transaction.create({ from_account, to_account, amount, remarks });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/transactions/:id
// VULN: IDOR — No ownership validation, anyone can view any transaction
router.get('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;