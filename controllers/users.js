import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const calluser = await User.find({
      attributes: ["nama", "alamat", "handphone"],
    });
    res.status(200).json(calluser);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const res = await User.findById(req.params.id);
    res.status(200).json(res);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const createUser = async (req, res) => {
  const { nama, alamat, handphone } = req.body;
  try {
    await User.create({
      nama: nama,
      alamat: alamat,
      handphone: handphone,
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const updateUser = async (req, res) => {
  const { nama, alamat, handphone } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      nama: nama,
      alamat: alamat,
      handphone: handphone,
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.status(200).json({ msg: "User Update" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
    res.status(200).json({ msg: "User Di deleted" });
  } catch (e) {
    res.status(404).json({ msg: e.message });
  }
};
