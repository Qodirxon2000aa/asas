const mongoose = require('mongoose');

const rasxodSchema = new mongoose.Schema({
  nomi: {
    type: String,
    required: [true, 'Rasxod nomi majburiy!'],
    trim: true,
  },
  summa: {
    type: Number,
    required: [true, 'Summa majburiy!'],
    min: [0, 'Summa manfiy bo‘lishi mumkin emas!'],
  },
  sana: {
    type: Date,
    required: [true, 'Sana majburiy!'],
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Rasxod', rasxodSchema);