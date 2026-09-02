require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/models/User.Model');
const Account = require('../src/models/Account.model');
const Transaction = require('../src/models/Transaction.model');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected for seeding...');

    // Clear existing records
    await User.deleteMany({});
    await Account.deleteMany({});
    await Transaction.deleteMany({});

    // Create a default customer
    const hashedPassword = await bcrypt.hash('Password123', 4);
    const customer = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: hashedPassword,
      role: 'customer'
    });

    // Create an employee
    const employee = await User.create({
      name: 'Jane Staff',
      email: 'employee@cyberbank.com',
      password: hashedPassword,
      role: 'employee'
    });

    // Create a bank account for the customer
    const account = await Account.create({
      customer_id: customer._id,
      account_number: 'ACC987654321',
      account_type: 'Savings',
      balance: 25000,
      status: 'Active'
    });

    // Create a sample transaction with a test XSS payload in remarks
    await Transaction.create({
      from_account: account.account_number,
      to_account: 'ACC123456789',
      amount: 1500,
      status: 'Success',
      remarks: '<script>alert("XSS Exploit Successful")</script>'
    });

    console.log('Database seeded successfully with test users, accounts, and transactions!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();