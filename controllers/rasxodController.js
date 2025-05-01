const Rasxod = require('../models/Rasxod');

// Get all expenses
const getRasxodlar = async (req, res, next) => {
  try {
    const rasxodlar = await Rasxod.find();
    res.status(200).json(rasxodlar);
  } catch (error) {
    console.error("Get all expenses error:", error);
    next(error);
  }
};

// Create an expense
const createRasxod = async (req, res, next) => {
  try {
    const { nomi, summa, sana } = req.body;

    // Validation
    if (!nomi || summa == null || !sana) {
      return res.status(400).json({ message: 'Nomi, summa va sana majburiy!' });
    }

    const rasxod = new Rasxod({
      nomi,
      summa,
      sana,
    });

    await rasxod.save();
    res.status(201).json({ message: 'Rasxod muvaffaqiyatli qo‘shildi!', rasxod });
  } catch (error) {
    console.error("Create expense error:", error);
    next(error);
  }
};

// Update an expense
const updateRasxod = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nomi, summa, sana } = req.body;

    // Validation
    if (!nomi || summa == null || !sana) {
      return res.status(400).json({ message: 'Nomi, summa va sana majburiy!' });
    }

    const updatedRasxod = await Rasxod.findByIdAndUpdate(
      id,
      { nomi, summa, sana },
      { new: true, runValidators: true }
    );

    if (!updatedRasxod) {
      return res.status(404).json({ message: 'Rasxod topilmadi!' });
    }

    res.status(200).json({ message: 'Rasxod muvaffaqiyatli yangilandi!', rasxod: updatedRasxod });
  } catch (error) {
    console.error("Update expense error:", error);
    next(error);
  }
};

// Delete an expense
const deleteRasxod = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedRasxod = await Rasxod.findByIdAndDelete(id);

    if (!deletedRasxod) {
      return res.status(404).json({ message: 'Rasxod topilmadi!' });
    }

    res.status(200).json({ message: 'Rasxod muvaffaqiyatli o‘chirildi!' });
  } catch (error) {
    console.error("Delete expense error:", error);
    next(error);
  }
};

module.exports = { getRasxodlar, createRasxod, updateRasxod, deleteRasxod };