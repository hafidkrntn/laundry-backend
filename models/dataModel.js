import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
  kode: {
    type: String,
    trim: true,
    required: true,
  },
  nama_paket: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  harga: {
    type: Number,
    required: true,
    trim: true,
  },
});

const DataLaundry = mongoose.model("DataLaundry", dataSchema);

export default DataLaundry;
