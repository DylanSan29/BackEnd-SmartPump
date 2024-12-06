import { User } from "../models/userModel.js";

export const getAllUsers = (req, res) => {
  const users = User.data.users;
  if (users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }

  res.json(users);
};

export const getUserDetails = (req, res) => {
  const { userId } = req.params;
  const user = User.data.users.find((user) => user._id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

export const getBalance = (req, res) => {
  const { userId } = req.params;

  const user = User.data.users.find((user) => user._id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ balance: user.balance });
};

export const updateUserDetails = (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  const userIndex = User.data.users.findIndex((user) => user._id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  User.data.users[userIndex] = { ...User.data.users[userIndex], ...updates };

  User.write();

  res.json({
    message: "User updated successfully",
    updatedUser: User.data.users[userIndex],
  });
};
