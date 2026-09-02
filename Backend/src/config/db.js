const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // DB connection establish kar rahe hain
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected Successfully to CyberBank DB');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;