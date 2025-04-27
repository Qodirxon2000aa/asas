const express = require('express');
const router = express.Router();
const { createMijoz } = require('../controllers/mijozController');

// Routes
router.post('/', createMijoz);

module.exports = router;