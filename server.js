const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const mijozRoutes = require('./routes/mijozRoutes');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
const rasxodRoutes = require('./routes/rasxodRoutes');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
connectDB();

// Routes
app.use('/users', userRoutes);
app.use('/mijoz', mijozRoutes);
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);
app.use('/expenses', rasxodRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portda ishlayapti`));