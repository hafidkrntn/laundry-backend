import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  nama: {
    type: String,
    index: true,
    unique: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  handphone: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
