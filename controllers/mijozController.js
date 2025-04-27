const Mijoz = require('../models/Mijoz');

// Get all customers
const getMijozlar = async (req, res, next) => {
  try {
    const mijozlar = await Mijoz.find();
    res.status(200).json(mijozlar);
  } catch (error) {
    next(error);
  }
};

// Create a customer
const createMijoz = async (req, res, next) => {
  try {
    const { name, phone, address } = req.body;

    // Validation
    if (!name || !phone) {
      return res.status(400).json({ message: 'Ism va telefon raqami majburiy!' });
    }

    const mijoz = new Mijoz({
      name,
      phone,
      address: address || '',
    });

    await mijoz.save();
    res.status(201).json({ message: 'Mijoz muvaffaqiyatli qo‘shildi!' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMijozlar, createMijoz };