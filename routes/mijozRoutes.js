const express = require('express');
const router = express.Router();
const { getMijozlar, createMijoz } = require('../controllers/mijozController');

// Routes
router.get('/', getMijozlar);
router.post('/', createMijoz);

module.exports = router;