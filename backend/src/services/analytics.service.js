import pool from "../config/db.js";

// RECORD CLICK
export const recordClick = async (link_id, ip, agent) => {
  await pool.query(
    "INSERT INTO clicks (link_id, ip_address, user_agent) VALUES (?, ?, ?)",
    [link_id, ip, agent]
  );
};

// analytics.service.js
export const getAnalytics = async (user_id) => {
  const [rows] = await pool.query(`
    SELECT links.id, links.title, COUNT(clicks.id) as count
    FROM links
    LEFT JOIN clicks ON clicks.link_id = links.id
    WHERE links.user_id = ?
    GROUP BY links.id
  `, [user_id]);

  return rows;
};