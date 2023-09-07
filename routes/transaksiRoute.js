import express from "express";
import { createTransaksi, deleteTransaksi, getTransaksi, getTransaksiById, updateTransaksi } from "../controllers/transaksi.js";

const router = express.Router();

router.post('/create', createTransaksi);
router.get('/all', getTransaksi);
router.get('/:id', getTransaksiById);
router.post('/update/:id', updateTransaksi);
router.delete('/delete/:id', deleteTransaksi);

export default router;