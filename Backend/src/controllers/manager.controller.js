const express = require('express');
const auth = require('../middlewares/auth.middleware');
// Note: Humne role middleware banaya hi nahi / use nahi kiya!

const router = express.Router();

// PUT /api/manager/requests/:id/approve
// VULN: Privilege Escalation — Manager routes only check JWT validity (auth), not role.
// Ek normal customer bhi yeh API hit karke request approve kar sakta hai!
router.put('/requests/:id/approve', auth, async (req, res) => {
  res.json({ 
    message: `Request ${req.params.id} has been APPROVED.`, 
    approvedBy: req.user.name,
    userRole: req.user.role // Yeh "customer" dikhayega agar koi customer exploit karega
  });
});

module.exports = router;