const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5MB
});

router.post('/upload', auth, upload.single('file'), resumeController.uploadResume);
router.get('/my-resumes', auth, resumeController.getMyResumes);
router.get('/:id', auth, resumeController.getResume);

module.exports = router;
