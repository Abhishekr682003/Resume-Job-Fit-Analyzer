const Resume = require('../models/Resume');
const { extractTextFromPDF, extractTextFromDOCX, extractSkills } = require('../utils/parser');
const path = require('path');
const fs = require('fs');

exports.uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        let extractedText = '';

        if (fileExtension === '.pdf') {
            extractedText = await extractTextFromPDF(filePath);
        } else if (fileExtension === '.docx' || fileExtension === '.doc') {
            extractedText = await extractTextFromDOCX(filePath);
        } else {
            return res.status(400).json({ message: 'Unsupported file format' });
        }

        const skills = extractSkills(extractedText);

        const resume = new Resume({
            userId: req.user._id,
            fileName: req.file.originalname,
            filePath: filePath,
            fileType: fileExtension.substring(1),
            extractedText,
            skills
        });

        await resume.save();
        res.status(201).json(resume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        if (resume.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
