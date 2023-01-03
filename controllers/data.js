import DataLaundry from "../models/dataModel.js";

export const getDatas = async (req, res) => {
  try {
    const datas = await DataLaundry.find({
      attributes: ["kode", "nama_paket", "harga"],
    });
    res.status(200).json(datas);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const getDatasById = async (req, res) => {
  try {
    const datas = await DataLaundry.findById(req.params.id);
    if (!datas) return res.status(404).json({ msg: "data tidak ditemukan" });
    res.status(200).json(datas);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const createDatas = async (req, res) => {
  const { kode, nama_paket, harga } = req.body;
  try {
    await DataLaundry.create({
      kode: kode,
      nama_paket: nama_paket,
      harga: harga,
    });
    res.status(201).json({ msg: "Data Telah dibuat" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const updateDatas = async (req, res) => {
  const { kode, nama_paket, harga } = req.body;
  try {
    const datas = await DataLaundry.findByIdAndUpdate(req.params.id, {
      kode: kode,
      nama_paket: nama_paket,
      harga: harga,
    });
    if (!datas) return res.status(404).json({ msg: "Data tidak ditemukan" });
    res.status(200).json({ msg: "Data telah diubah" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const deleteDatas = async (req, res) => {
  try {
    const datas = await DataLaundry.findByIdAndDelete(req.params.id);
    if (!datas) return res.status(404).json({ msg: "Data tidak ditemukan" });
    res.status(200).json({ msg: "Data telah di hapus" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};
