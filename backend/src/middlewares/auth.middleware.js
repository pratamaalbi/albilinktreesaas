import { verifyToken } from "../utils/jwt.js";

// auth.middleware.js - tambah sementara
export default function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("TOKEN RECEIVED:", token); // ← tambah ini
  console.log("JWT_SECRET:", process.env.JWT_SECRET); // ← dan ini

  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message); // ← dan ini
    res.status(401).json({ msg: "Token invalid" });
  }
}