import mongoose from "mongoose";

const transaksiSchema = mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    paket: {
      type: String,
      required: true,
    },
    berat: {
      type: String,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    pembayaran: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaksi = mongoose.model("Transaksi", transaksiSchema);
console.log(transaksiSchema);

export default Transaksi;
