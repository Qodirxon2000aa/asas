const Product = require('../models/Product');

// Get all products or filter by barcode
const getProducts = async (req, res, next) => {
  try {
    const { barcode } = req.query;
    let products;

    if (barcode) {
      products = await Product.find({ barcode });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products.map(product => ({
      id: product._id,
      name: product.name,
      price: product.price,
      sellingPrice: product.sellingPrice,
      quantity: product.quantity,
      dateAdded: product.dateAdded,
      category: product.category,
      barcode: product.barcode,
    })));
  } catch (error) {
    next(error);
  }
};

// Create a product
const createProduct = async (req, res, next) => {
  try {
    const { name, price, sellingPrice, quantity, dateAdded, category, barcode } = req.body;

    // Validation
    if (!name || !price || !sellingPrice || !quantity || !dateAdded || !category || !barcode) {
      return res.status(400).json({ message: 'Barcha maydonlar to‘ldirilishi shart!' });
    }
    if (isNaN(price) || isNaN(sellingPrice) || isNaN(quantity)) {
      return res.status(400).json({ message: 'Narx, sotilish narxi va soni raqam bo‘lishi kerak!' });
    }

    const product = new Product({
      name,
      price: Number(price),
      sellingPrice: Number(sellingPrice),
      quantity: Number(quantity),
      dateAdded: new Date(dateAdded),
      category,
      barcode,
    });

    await product.save();
    res.status(201).json({ message: 'Maxsulot muvaffaqiyatli qo‘shildi!' });
  } catch (error) {
    next(error);
  }
};

// Update a product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, sellingPrice, quantity, dateAdded, category, barcode } = req.body;

    // Validation
    if (!name || !price || !sellingPrice || !quantity || !dateAdded || !category || !barcode) {
      return res.status(400).json({ message: 'Barcha maydonlar to‘ldirilishi shart!' });
    }
    if (isNaN(price) || isNaN(sellingPrice) || isNaN(quantity)) {
      return res.status(400).json({ message: 'Narx, sotilish narxi va soni raqam bo‘lishi kerak!' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Maxsulot topilmadi!' });
    }

    product.name = name;
    product.price = Number(price);
    product.sellingPrice = Number(sellingPrice);
    product.quantity = Number(quantity);
    product.dateAdded = new Date(dateAdded);
    product.category = category;
    product.barcode = barcode;

    await product.save();
    res.status(200).json({ message: 'Maxsulot muvaffaqiyatli tahrirlandi!' });
  } catch (error) {
    next(error);
  }
};

// Delete a product
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Maxsulot topilmadi!' });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Maxsulot muvaffaqiyatli o‘chirildi!' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };