import express from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/users.js";

const router = express.Router();

router.post('/register', createUser);
router.get('/users',getUsers);
router.post('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;