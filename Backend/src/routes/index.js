const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const accountController = require('../controllers/account.controller');
const transactionController = require('../controllers/transaction.controller');
const paymentController = require('../controllers/payment.controller');
const beneficiaryController = require('../controllers/beneficiary.controller');
const supportTicketController = require('../controllers/supportTicket.controller');
const employeeController = require('../controllers/employee.controller');
const managerController = require('../controllers/manager.controller');
const adminController = require('../controllers/admin.controller'); // NEW

router.use('/auth', authController);
router.use('/accounts', accountController);
router.use('/transactions', transactionController);
router.use('/payments', paymentController);
router.use('/beneficiaries', beneficiaryController);
router.use('/support', supportTicketController);
router.use('/employee', employeeController);
router.use('/manager', managerController);
router.use('/admin', adminController); // NEW

module.exports = router;