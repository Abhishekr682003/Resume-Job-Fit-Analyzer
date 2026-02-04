const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
const allowedOrigins = [
    'http://localhost:3000',
    'https://resume-job-fit-analyzer-jdck.vercel.app',
    process.env.CORS_ORIGINS
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.some(allowed => origin.startsWith(allowed))) {
            callback(null, true);
        } else {
            callback(null, true); // Allow all origins for now, can restrict later
        }
    },
    credentials: true
}));
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
