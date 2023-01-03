import express from "express";
import { loginAdmin, registerAdmin, logout } from "../controllers/login.js";

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.delete('/logout', logout);

export default router;