import express from 'express';
import { getUserDetails, getBalance, updateUserDetails, getAllUsers } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddlerware.js';

const router = express.Router();

router.get('/api/user/:userId', authenticate, getUserDetails);
router.get('/api/AllUsers', authenticate, getAllUsers);
router.get('/api/balance/:userId', authenticate, getBalance);
router.patch('/api/user/:userId', authenticate, updateUserDetails);

export default router;
