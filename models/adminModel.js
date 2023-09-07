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
  const admin = await Admin.findOne({ username });
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

AdminSchema.statics.login = async function (username, password) {
  const admin = await this.findOne({ username });
  if (admin) {
    const auth = await bcrypt.compare(password, admin.password);
    if (auth) {
      return admin;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
