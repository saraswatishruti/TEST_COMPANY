const express = require('express');
const Beneficiary = require('../models/Beneficiary.model');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { name, account_number, bank_name } = req.body;
    const beneficiary = await Beneficiary.create({ customer_id: req.user._id, name, account_number, bank_name });
    res.status(201).json(beneficiary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find({ customer_id: req.user._id });
    res.json(beneficiaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// VULN: IDOR (Destructive) — Hacker can delete someone else's beneficiary!
router.delete('/:id', auth, async (req, res) => {
  try {
    // Should check if beneficiary.customer_id === req.user._id before deleting, but we skip it.
    await Beneficiary.findByIdAndDelete(req.params.id);
    res.json({ message: 'Beneficiary deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;