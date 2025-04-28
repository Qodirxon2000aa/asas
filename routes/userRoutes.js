const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/userController");

// Multer konfiguratsiyasi
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Faqat rasm fayllari yuklanadi!"));
    }
  }
});

// Routes
router.get("/", getUsers);
router.post("/", upload.single("avatar"), createUser);
router.put("/:id", upload.single("avatar"), updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
