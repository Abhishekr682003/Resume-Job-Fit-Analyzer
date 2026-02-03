const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const auth = require('../middleware/auth');

router.post('/analyze', auth, analysisController.analyzeResume);
router.get('/:id', auth, analysisController.getAnalysis);

module.exports = router;
