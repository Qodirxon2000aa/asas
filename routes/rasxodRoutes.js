const express = require('express');
const router = express.Router();
const { getRasxodlar, createRasxod, updateRasxod, deleteRasxod } = require('../controllers/rasxodController');

// Routes
router.get('/', getRasxodlar);
router.post('/', createRasxod);
router.put('/:id', updateRasxod);
router.delete('/:id', deleteRasxod);

module.exports = router;