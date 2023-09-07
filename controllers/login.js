import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register User
export const registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.create({ username, password });
    res.status(201).json({
      admin: admin._id,
      created: true,
      msg: "telah berhasil buat admin",
    });
  } catch (e) {
    res.status(400).json({ msg: e.message, created: false });
  }

  if (!username || !password) {
    res.status(400).json({ msg: "Tolong di isi kolom yang kosong" });
  }
  if (password.length < 6) {
    res.status(400).json({ msg: "Password harus lebih dari 6 karakter" });
  }

  // get admin
  const adminExist = await Admin.findOne({ username });

  if (adminExist) {
    res.status(400).json({ msg: e.message });
  }
};

// login admin
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      res.status(400).json({ msg: "Admin tidak ditemukan, tolong daftar" });
    }
    const passwordIsCorrect = await bcrypt.compare(password, admin.password);
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    if (admin && passwordIsCorrect) {
      // const { _id, username, password } = admin;
      res.status(200).json({
        msg: "anda telah login",
        token,
      });
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

// logout
export const logout = async (req, res) => {
  try {
    const admin = await Admin.findOneAndDelete({ username });
    if (!admin) return res.status(404).json({ msg: "user tidak ditemukan" });
    res.status(200).json({ msg: "anda telah logout" });
  } catch (e) {
    res.status(404).json({ msg: e.message });
  }
};
