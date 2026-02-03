const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    try {
        const { title, description, company, location, requiredSkills, minExperience, qualifications } = req.body;
        const job = new Job({
            title,
            description,
            company,
            location,
            requiredSkills,
            minExperience,
            qualifications,
            creatorId: req.user._id
        });
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const { title, description, company, location, requiredSkills, minExperience, qualifications } = req.body;
        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, creatorId: req.user._id },
            { title, description, company, location, requiredSkills, minExperience, qualifications },
            { new: true }
        );
        if (!job) {
            return res.status(404).json({ message: 'Job not found or unauthorized' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({ _id: req.params.id, creatorId: req.user._id });
        if (!job) {
            return res.status(404).json({ message: 'Job not found or unauthorized' });
        }
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
