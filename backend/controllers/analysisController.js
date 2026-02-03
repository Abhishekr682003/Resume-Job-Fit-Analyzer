const AnalysisResult = require('../models/AnalysisResult');
const Resume = require('../models/Resume');
const Job = require('../models/Job');

exports.analyzeResume = async (req, res) => {
    try {
        const { resumeId, jobId } = req.body;

        const resume = await Resume.findById(resumeId);
        const job = await Job.findById(jobId);

        if (!resume || !job) {
            return res.status(404).json({ message: 'Resume or Job not found' });
        }

        const resumeSkills = resume.skills || [];
        const jobSkills = job.requiredSkills || [];

        const matchedSkills = resumeSkills.filter(skill =>
            jobSkills.some(jobSkill => jobSkill.toLowerCase() === skill.toLowerCase())
        );

        const missingSkills = jobSkills.filter(jobSkill =>
            !resumeSkills.some(skill => skill.toLowerCase() === jobSkill.toLowerCase())
        );

        const matchPercentage = jobSkills.length > 0
            ? Math.round((matchedSkills.length / jobSkills.length) * 100 * 100) / 100
            : 0;

        const skillSuggestions = missingSkills.map(skill => `Consider learning or improving: ${skill}`);
        if (job.minExperience > 0) {
            skillSuggestions.push(`Gain at least ${job.minExperience} years of relevant experience`);
        }

        const result = new AnalysisResult({
            resumeId,
            jobId,
            matchPercentage,
            matchedSkills,
            missingSkills,
            skillSuggestions,
            jobTitle: job.title,
            resumeText: resume.extractedText
        });

        await result.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAnalysis = async (req, res) => {
    try {
        const result = await AnalysisResult.findById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Analysis result not found' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
