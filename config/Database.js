import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// mongoose.connect

mongoose.set("strictQuery", true).connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to DB");
}).catch((e) => {
    console.log(e.message);
})