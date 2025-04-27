const express = require('express');
const router = express.Router();
const { getSales, createSale } = require('../controllers/saleController');

console.log('Sotuv yo‘llari sozlanmoqda');
router.get('/', getSales);
router.post('/', createSale);

module.exports = router;