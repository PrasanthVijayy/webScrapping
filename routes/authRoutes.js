import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();
export const authRoutes = (app) => {
  app.use('/webScrapping/api/v1/auth', router);
};

router.post('/login', login);
router.post('/register', register);