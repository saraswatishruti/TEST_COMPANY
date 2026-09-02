const express = require('express');
const Payment = require('../models/Payment.model');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { amount, recipient, gateway } = req.body;
    const payment = await Payment.create({ 
      customer_id: req.user._id, 
      amount, recipient, gateway, 
      reference: 'PAY-' + Math.floor(Math.random() * 1000000) 
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// VULN: IDOR — Anyone can fetch any payment receipt by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;