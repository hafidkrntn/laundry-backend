import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          next();
        } else {
          const admin = await Admin.findById(decodedToken.id);
          if (admin) res.json({ status: true, admin: admin.username });
          else res.json({ status: false });
          next();
        }
      }
    );
  } else {
    res.json({ status: false });
    next();
  }
};