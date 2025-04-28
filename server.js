const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs").promises;
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const mijozRoutes = require("./routes/mijozRoutes");
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Request log
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// MongoDB connect
connectDB();

// Routes
app.use("/users", userRoutes);
app.use("/mijoz", mijozRoutes);
app.use("/products", productRoutes);
app.use("/sales", saleRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.message.includes("Faqat rasm fayllari")) {
    return res.status(400).json({ message: err.message });
  }
  res.status(err.status || 500).json({ message: err.message || "Serverda xatolik yuz berdi!" });
});

// uploads papka yaratish
fs.mkdir(path.join(__dirname, "uploads"), { recursive: true }).catch(err =>
  console.warn("Uploads papkasi yaratilmagan:", err.message)
);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server port ${PORT} da ishlayapti 🚀`));
