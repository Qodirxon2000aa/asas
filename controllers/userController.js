const User = require("../models/User");
const path = require("path");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");

// Barcha foydalanuvchilarni olish
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Yangi foydalanuvchi yaratish
const createUser = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    let avatarUrl = null;

    if (!username || !password) {
      return res.status(400).json({ message: "Login va parol kiritilishi shart!" });
    }

    if (req.file) {
      avatarUrl = `/uploads/${req.file.filename}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      role,
      avatarUrl,
    });

    await user.save();
    res.status(201).json({ message: "Foydalanuvchi muvaffaqiyatli yaratildi!" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Bu login allaqachon ishlatilgan!" });
    }
    next(error);
  }
};

// Foydalanuvchini yangilash
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;
    let avatarUrl = null;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi!" });
    }

    if (req.file) {
      if (user.avatarUrl) {
        const oldAvatarPath = path.join(__dirname, "..", user.avatarUrl);
        try {
          await fs.unlink(oldAvatarPath);
        } catch (err) {
          console.warn("Eski avatar o‘chirilmadi:", err);
        }
      }
      avatarUrl = `/uploads/${req.file.filename}`;
    } else {
      avatarUrl = user.avatarUrl;
    }

    user.username = username || user.username;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.role = role || user.role;
    user.avatarUrl = avatarUrl;

    await user.save();
    res.status(200).json({ message: "Foydalanuvchi muvaffaqiyatli yangilandi!" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Bu login allaqachon ishlatilgan!" });
    }
    next(error);
  }
};

// Foydalanuvchini o‘chirish
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi!" });
    }

    if (user.avatarUrl) {
      const avatarPath = path.join(__dirname, "..", user.avatarUrl);
      try {
        await fs.unlink(avatarPath);
      } catch (err) {
        console.warn("Avatar o‘chirilmadi:", err);
      }
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Foydalanuvchi muvaffaqiyatli o‘chirildi!" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };