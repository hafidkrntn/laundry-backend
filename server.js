import express  from "express";
import cors from "cors";
import dotenv from "dotenv"
import "./config/Database.js";
import loginRoute from "./routes/loginRoute.js";
import usersRoute from "./routes/usersRoute.js";
import datasRoute from "./routes/datasRoute.js";
import transaksiRoute from "./routes/transaksiRoute.js"
import excelRoute from "./services/exportExcel.js"
import pdfRoute from "./services/exportPdf.js"

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
app.use('/auth', loginRoute);
app.use('/users', usersRoute);
app.use('/datas', datasRoute);
app.use('/transaksi', transaksiRoute);
app.use('/export', excelRoute);
app.use('/download', pdfRoute);

app.listen(5000, () => {
    console.log("Server is running 5000 ..")
});

