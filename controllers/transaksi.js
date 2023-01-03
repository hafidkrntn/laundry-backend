import Transaksi from "../models/transaksiModel.js";

export const getTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.find({
      attributes: [
        "customer",
        "paket",
        "berat",
        "harga",
        "total",
        "pembayaran",
      ],
    });
    res.status(200).json(transaksi);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const getTransaksiById = async (req, res) => {
  try {
    const transaksi = await Transaksi.findById(req.params.id);
    if (!transaksi)
      return res.status(404).json({ msg: "Transaksi tidak ditemukan" });
    res.status(200).json(transaksi);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const createTransaksi = async (req, res) => {
  const { customer, paket, berat, harga, total, pembayaran } = req.body;
  try {
    await Transaksi.create({
      customer: customer,
      paket: paket,
      berat: berat,
      harga: harga,
      total: total,
      pembayaran: pembayaran,
    });
    res.status(201).json({ msg: "Transaksi telah dibuat" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const updateTransaksi = async (req, res) => {
  const { customer, paket, berat, harga, total, pembayaran } = req.body;
  try {
    const transaksi = await Transaksi.findByIdAndUpdate(req.params.id, {
      customer: customer,
      paket: paket,
      berat: berat,
      harga: harga,
      total: total,
      pembayaran: pembayaran,
    });
    if (!transaksi)
      return res.status(404).json({ msg: "Transaksi tidak ditemukan" });
    res.status(200).json({ msg: "Transaksi telah diubah" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const deleteTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findByIdAndDelete(req.params.id);
    if (!transaksi)
      return res.status(404).json({ msg: "Transaksi tidak ditemukan" });
    res.status(200).json({ msg: "Transaksi telah di hapus" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};
