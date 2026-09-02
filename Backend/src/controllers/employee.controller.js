const express = require('express');
const User = require('../models/User.Model');
const Transaction = require('../models/Transaction.model');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

// GET /api/employee/customers
// VULN: NoSQL Injection — raw query object built directly from user input (req.query)
router.get('/customers', auth, async (req, res) => {
  try {
    // Agar attacker bheje: ?role[$ne]=customer 
    // Toh Mongoose isko as an operator treat karega aur filters bypass ho jayenge.
    const results = await User.find(req.query); 
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// VULN: IDOR — Employee can look up any specific customer
router.get('/customers/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;