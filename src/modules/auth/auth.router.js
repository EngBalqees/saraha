import { Router } from "express";
import * as authController from './auth.controller.js';

const router = Router();
router.post('/userRegister',authController.Register);
router.post('/userLogin',authController.Login);

export default router;