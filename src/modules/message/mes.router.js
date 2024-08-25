import { Router } from "express";
import * as MessageController from './mes.contoller.js';
import validation from "../../midleware/validation.js";
import { sendMessageSchema } from "./mes.validation.js";
import { auth } from "../../midleware/auth.js";
const router = Router();

router.post('/:receiverId',validation(sendMessageSchema),MessageController.sendMessage);
router.get('/',auth,MessageController.getMessages);
export default router;