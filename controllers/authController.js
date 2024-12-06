import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';

export const login = (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = User.data.users.find(user => user.email === email); 

  // Check if user exists
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Compare the plaintext password
  if (password !== user.password) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Generate token if password matches
  const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

  res.json({ token, userId: user._id });
};

