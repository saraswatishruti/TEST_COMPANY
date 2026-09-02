const express = require('express');
const Account = require('../models/Account.model');
const auth = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer({ dest: 'src/uploads/' });

const router = express.Router();

// POST /api/accounts - Create a new account (Testing ke liye)
router.post('/', auth, async (req, res) => {
  try {
    const { account_type, balance } = req.body;
    // Generate a dummy 10-digit account number
    const account_number = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    
    const account = await Account.create({
      customer_id: req.user._id, // Auth middleware se mila user ID
      account_number,
      account_type,
      balance
    });
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/accounts - List logged-in user's accounts
router.get('/', auth, async (req, res) => {
  try {
    const accounts = await Account.find({ customer_id: req.user._id });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/accounts/:id - Get single account details
// VULN: Broken Access Control / IDOR — no check that account.customer_id === req.user._id
router.get('/:id', auth, async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ message: 'Account not found' });
    
    // Yahan check hona chahiye tha: if(String(account.customer_id) !== String(req.user._id)) throw error
    // Par humne check nahi kiya! Koi bhi valid token wala kisi ka bhi account ID daalkar detail nikal sakta hai.
    
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/upload-kyc', auth, upload.single('kyc'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.json({ 
      message: 'KYC Document uploaded successfully', 
      file: req.file 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;