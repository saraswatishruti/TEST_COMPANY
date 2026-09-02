const express = require('express');
const cors = require('cors');

const app = express();

// VULN: Security Misconfiguration — wide-open CORS
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use('/api', require('./routes/index'));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to CyberBank API (Lab Environment)' });
});

// VULN: Security Misconfiguration — debug route exposes env info
app.get('/debug', (req, res) => {
    res.json({ env: process.env });
});

// VULN: Security Misconfiguration — verbose errors leak stack traces
app.use((err, req, res, next) => {
    res.status(500).json({ 
        message: err.message, 
        stack: err.stack 
    });
});

module.exports = app;