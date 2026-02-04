const fs = require('fs');
const mammoth = require('mammoth');

// Lazy load pdf-parse only when needed (fixes Vercel serverless issues)
const pdfParse = require('pdf-parse');

const extractTextFromPDF = async (fileBuffer) => {
    try {
        const data = await pdfParse(fileBuffer);
        return data.text;
    } catch (error) {
        console.error('PDF parsing error:', error);
        throw new Error('Failed to parse PDF file');
    }
};

const extractTextFromDOCX = async (fileBuffer) => {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value;
};

const extractSkills = (text) => {
    const skillKeywords = [
        "Java", "Python", "JavaScript", "React", "Angular", "Vue", "Node.js",
        "Spring Boot", "Django", "Flask", "Express", "SQL", "MySQL", "PostgreSQL",
        "MongoDB", "AWS", "Azure", "Docker", "Kubernetes", "Git", "GitHub",
        "HTML", "CSS", "Bootstrap", "TypeScript", "REST API", "GraphQL",
        "Machine Learning", "Data Science", "TensorFlow", "PyTorch",
        "C++", "C#", ".NET", "PHP", "Ruby", "Go", "Rust",
        "Agile", "Scrum", "DevOps", "CI/CD", "Jenkins", "Jira"
    ];

    const foundSkills = [];
    const lowerText = text.toLowerCase();

    skillKeywords.forEach(skill => {
        if (lowerText.includes(skill.toLowerCase())) {
            foundSkills.push(skill);
        }
    });

    return foundSkills;
};

module.exports = {
    extractTextFromPDF,
    extractTextFromDOCX,
    extractSkills
};
