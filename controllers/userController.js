const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// Get all users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Create a user
const createUser = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    let avatarUrl = null;

    if (req.file) {
      avatarUrl = `/uploads/${req.file.filename}`;
    }

    const user = new User({
      username,
      password, // Note: In production, hash the password
      role,
      avatarUrl,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

// Update a user
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;
    let avatarUrl = req.body.avatarUrl || null;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.file) {
      // Delete old avatar if it exists
      if (user.avatarUrl) {
        const oldAvatarPath = path.join(__dirname, '..', user.avatarUrl);
        if (fs.existsSync(oldAvatarPath)) {
          fs.unlinkSync(oldAvatarPath);
        }
      }
      avatarUrl = `/uploads/${req.file.filename}`;
    }

    user.username = username || user.username;
    user.password = password || user.password; // Note: In production, hash the password
    user.role = role || user.role;
    user.avatarUrl = avatarUrl;

    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete a user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.avatarUrl) {
      const avatarPath = path.join(__dirname, '..', user.avatarUrl);
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
      }
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };