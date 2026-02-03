const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        console.log('Registration request received:', req.body);
        const { email, password, firstName, lastName, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'Email already in use' });
        }
        const username = firstName + lastName + Math.floor(Math.random() * 1000);
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            username,
            role: role || 'CANDIDATE'
        });

        console.log('User object prepared:', user);
        await user.save();
        console.log('User saved successfully');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '24h'
        });

        res.status(201).json({
            token,
            type: 'Bearer',
            id: user._id,
            email: user.email,
            firstName,
            lastName,
            role: user.role
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        console.log('Login request received:', req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log('Login failed: User not found:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log('Login failed: Password mismatch for:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Login successful for:', email);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '24h'
        });

        res.json({
            token,
            type: 'Bearer',
            id: user._id,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};
