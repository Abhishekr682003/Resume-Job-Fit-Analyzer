
URL = https://resume-job-fit-analyzer-jdck.vercel.app/dashboard
# AI-Based ATS Resume Tracker (MERN Stack)

A powerful, AI-driven application designed to help candidates optimize their resumes for Applicant Tracking Systems (ATS) and assist recruiters in finding the best matches for job openings.

## 🚀 Overview

This project has been migrated from a Spring Boot architecture to a full **MERN Stack** (MongoDB, Express, React, Node.js) for better scalability, flexibility, and a unified JavaScript/TypeScript development experience.

## ✨ Features

- **Resume Parsing**: Automatically extract text and skills from PDF and DOCX files.
- **AI-Based Analysis**: Compare resumes against job descriptions to calculate match percentages.
- **Skill Gap Analysis**: Identify missing skills and receive suggestions for improvement.
- **Authentication**: Secure JWT-based login and registration system.
- **Dual Roles**: Supports both Candidates (upload/analyze) and Recruiters (create jobs).

## 🛠️ Technology Stack

- **Frontend**: React.js, Axios, React Router, Recharts (for visualization).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Files**: Multer (upload), pdf-parse (PDF), mammoth (DOCX).
- **Security**: Bcrypt.js (hashing), JSON Web Tokens (auth).

## 🚦 Quick Start

1. **Clone the repository**
2. **Setup Backend**:
   - `cd backend`
   - `npm install`
   - Configure `.env` with your MongoDB URI and JWT secret.
   - `npm start`
3. **Setup Frontend**:
   - `cd frontend`
   - `npm install`
   - `npm start`
4. **Access the app**: `http://localhost:3000`

---

## 📖 Documentation

For detailed installation and setup instructions, please refer to the [SETUP_GUIDE.md](file:///c:/Users/prajw/OneDrive/Desktop/AbhiDocs/Ai%20based%20Ats%20resume%20tracker/SETUP_GUIDE.md).
