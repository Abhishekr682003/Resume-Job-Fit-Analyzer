const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const dns = require('dns');

// Configure DNS servers to fix querySrv issues on Windows
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ats_resume_db';

console.log('Attempting to connect to MongoDB...');

mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000,
    family: 4 // Use IPv4, skip trying IPv6
})
    .then(() => {
        console.log('✅ MongoDB Connected Successfully');
        console.log(`Database: ${mongoose.connection.name}`);
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.error('Please check:');
        console.error('1. Your internet connection');
        console.error('2. MongoDB Atlas IP whitelist (add 0.0.0.0/0 to allow all IPs)');
        console.error('3. Database credentials in .env file');
        console.error('4. Network/firewall settings');
    });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/analysis', require('./routes/analysis'));

app.get('/api/health', (req, res) => {
    res.json({ status: 'UP' });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
