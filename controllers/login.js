import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";

// Register User
export const registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ msg: "Tolong di isi kolom yang kosong" });
  }
  if (password.length < 6) {
    res.status(400).json({ msg: "Password harus lebih dari 6 karakter" });
  }

  // get admin
  const adminExist = await Admin.findOne({ username });

  if (adminExist) {
    res.status(400).json({ msg: "Email sudah terdaftar" });
  }

  // create admin
  const admin = await Admin.create({
    username,
    password,
  });

  if (admin) {
    const { _id, username, password } = admin;
    res.status(201).json({
      _id,
      username,
      password,
    });
  } else {
    res.status(400).json({ msg: "Invalid Admin" });
  }
};

// login admin
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ msg: "Please tambahkan username dan password" });
  }

  const admin = await Admin.findOne({ username });
  if (!admin) {
    res.status(400).json({ msg: "Admin tidak ditemukan, tolong daftar" });
  }

  const passwordIsCorrect = await bcrypt.compare(password, admin.password);
  if (admin && passwordIsCorrect) {
    const { _id, username, password } = admin;
    res.status(200).json({
      msg: "anda telah login",
    });
  } else {
    res.status(400).json({ msg: "Invalid username atau password" });
  }
};

// logout
export const logout = async (req, res) => {
  try {
    const admin = await Admin.findOneAndDelete({ username });
    console.log(admin, "ini admin");
    if (!admin) return res.status(404).json({ msg: "user tidak ditemukan" });
    res.status(200).json({ msg: "anda telah logout" });
  } catch (e) {
    res.status(404).json({ msg: e.message });
  }
};
