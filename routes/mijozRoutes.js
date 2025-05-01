const express = require('express');
const router = express.Router();
const { getMijozlar, createMijoz, updateMijoz, deleteMijoz } = require('../controllers/mijozController');

// Routes
router.get('/', getMijozlar);
router.post('/', createMijoz);
router.put('/:id', updateMijoz);
router.delete('/:id', deleteMijoz);

module.exports = router;