const Sale = require('../models/Sale');
const Product = require('../models/Product');

// Barcha sotuvlarni olish
const getSales = async (req, res, next) => {
  console.log('GET /sales so‘rovi keldi');
  try {
    const sales = await Sale.find().populate('productId', 'name barcode');
    console.log('Sotuvlar topildi:', sales.length);
    res.status(200).json(sales.map(sale => ({
      id: sale._id,
      productId: sale.productId._id,
      productName: sale.productId.name,
      barcode: sale.productId.barcode,
      quantity: sale.quantity,
      name: sale.name,
      sellingPrice: sale.sellingPrice,
      price: sale.price,
      category: sale.category,
      saleDate: sale.saleDate,
    })));
  } catch (error) {
    console.error('GET /sales xatosi:', error.message);
    next(error);
  }
};

// Sotuv yaratish
const createSale = async (req, res, next) => {
  console.log('POST /sales so‘rovi keldi:', req.body);
  try {
    const { productId, quantity, name, sellingPrice, price, category, barcode } = req.body;

    if (!productId || !quantity || !name || !sellingPrice || !price || !category || !barcode) {
      console.log('Maydonlar to‘liq emas');
      return res.status(400).json({ message: 'Barcha maydonlar kerak!' });
    }
    if (quantity <= 0) {
      console.log('Noto‘g‘ri miqdor:', quantity);
      return res.status(400).json({ message: 'Miqdor 0 dan katta bo‘lishi kerak!' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      console.log('Maxsulot topilmadi:', productId);
      return res.status(404).json({ message: 'Maxsulot topilmadi!' });
    }
    if (product.quantity < quantity) {
      console.log('Zaxira yetarli emas:', product.quantity, 'so‘ralgan:', quantity);
      return res.status(400).json({ message: `Maxsulot ${name} uchun zaxira yetarli emas! Qoldiq: ${product.quantity}` });
    }

    const sale = new Sale({
      productId,
      quantity,
      name,
      sellingPrice,
      price,
      category,
      barcode,
    });

    product.quantity -= quantity;
    await product.save();
    await sale.save();

    console.log('Sotuv muvaffaqiyatli:', sale._id);
    res.status(201).json({ message: 'Sotuv muvaffaqiyatli yakunlandi!' });
  } catch (error) {
    console.error('POST /sales xatosi:', error.message);
    next(error);
  }
};

module.exports = { getSales, createSale };