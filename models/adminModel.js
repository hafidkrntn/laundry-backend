import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AdminSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    minimize: false,
  }
);

AdminSchema.statics.findByCredentials = async function (username, password) {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error("invalid credentials");
};

AdminSchema.methods.toJSON = function () {
  const admin = this;
  const adminObject = admin.toObject();
  delete adminObject.password;
  return adminObject;
};

// before save hash password
AdminSchema.pre("save", function (next) {
  const admin = this;
  if (!admin.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(admin.password, salt, function (err, hash) {
      admin.password = hash;
      next();
    });
  });
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
