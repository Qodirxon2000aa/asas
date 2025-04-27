const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  sellingPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  dateAdded: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Mishka va Klavalar', 'Kabelar', 'Kompyuter Jihozlari', 'Steklo', 'Xizmatlar'],
  },
  barcode: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);