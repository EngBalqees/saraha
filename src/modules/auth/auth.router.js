import { Router } from "express";
import * as authController from './auth.controller.js';
import validation from "../../midleware/validation.js";
import { LoginSchema, RegisterSchema } from "./auth.validation.js";

const router = Router();
router.post('/userRegister',validation(RegisterSchema),authController.Register);
router.post('/userLogin',validation(LoginSchema),authController.Login);

export default router;