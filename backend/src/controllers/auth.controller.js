import { createUser, findUserByEmail } from "../services/auth.service.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ✅ Validasi basic
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Semua field wajib diisi" });
    }

    // ✅ Cek user sudah ada
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: "Email sudah terdaftar" });
    }

    const hashed = await hashPassword(password);
    const user = await createUser(username, email, hashed);

    // 🔥 HAPUS PASSWORD
    const { password: _, ...safeUser } = user;

    res.json(safeUser);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validasi
    if (!email || !password) {
      return res.status(400).json({ msg: "Email & password wajib" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ msg: "User tidak ada" });
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return res.status(400).json({ msg: "Password salah" });
    }

    const token = signToken(user);

    // 🔥 HAPUS PASSWORD
    const { password: _, ...safeUser } = user;

    res.json({ token, user: safeUser });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};