import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/Database.js";
import loginRoute from "./routes/loginRoute.js";
import usersRoute from "./routes/usersRoute.js";
import datasRoute from "./routes/datasRoute.js";
import transaksiRoute from "./routes/transaksiRoute.js";
import excelRoute from "./services/exportExcel.js";
import pdfRoute from "./services/exportPdf.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use("/api/auth", loginRoute);
app.use("/api/users", usersRoute);
app.use("/api/datas", datasRoute);
app.use("/api/transaksi", transaksiRoute);
app.use("/api/export", excelRoute);
app.use("/api/download", pdfRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running 5000 ..");
});
