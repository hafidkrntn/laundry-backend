import express from "express";
import { createDatas, deleteDatas, getDatas, getDatasById, updateDatas } from "../controllers/data.js";

const router = express.Router();

router.post('/register', createDatas);
router.get('/data', getDatas);
router.get('/data/:id', getDatasById);
router.post('/update/:id', updateDatas);
router.delete('/delete/:id', deleteDatas);

export default router;