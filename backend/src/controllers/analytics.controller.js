import * as analyticsService from "../services/analytics.service.js";
import pool from "../config/db.js";

export const click = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM links WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).send("Not found");
    }

    const link = rows[0];

    await analyticsService.recordClick(
      req.params.id,
      req.ip,
      req.headers["user-agent"]
    );

    // 🔥 redirect langsung ke URL asli
    res.redirect(link.url);
  } catch (err) {
    console.error("CLICK ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getStats = async (req, res) => {
  try {
    const data = await analyticsService.getAnalytics(req.user.id);
    res.json(data);
  } catch (err) {
    console.error("STATS ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};