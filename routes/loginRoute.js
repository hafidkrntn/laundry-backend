import express from "express";
import { loginAdmin, registerAdmin, logout } from "../controllers/login.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/', verifyToken);
router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.delete('/logout', logout);

export default router;