const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const mijozRoutes = require('./routes/mijozRoutes');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

dotenv.config();
const app = express();

// O‘rta dasturlar
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Har bir so‘rovni log qilish
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// MongoDB ga ulanish
connectDB();

// Yo‘llar
app.use('/users', userRoutes);
app.use('/mijoz', mijozRoutes);
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

// Xato boshqaruvchisi
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portda ishlayapti`));