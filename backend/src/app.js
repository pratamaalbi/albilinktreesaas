import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import linkRoutes from "./routes/link.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import pool from "./config/db.js";

const app = express();

// 🔥 Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 🔥 Health check (biar tau server hidup)
app.get("/ping", (req, res) => {
  res.send("pong");
});

// 🔥 Hilangin error favicon
app.get("/favicon.ico", (req, res) => res.status(204).end());

// 🔥 API routes (diprioritaskan dulu)
app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);
app.use("/api", analyticsRoutes);

// 🌐 PUBLIC PROFILE (AMAN, GA TABRAK API)
app.get("/u/:username", async (req, res) => {
  try {
    const [userRows] = await pool.query(
      "SELECT id, username FROM users WHERE username = ?",
      [req.params.username]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    const user = userRows[0];

    const [links] = await pool.query(
      "SELECT id, title, url FROM links WHERE user_id = ? ORDER BY position",
      [user.id]
    );

    res.json({
      username: user.username,
      links
    });
  } catch (err) {
    console.error("PUBLIC PROFILE ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default app;