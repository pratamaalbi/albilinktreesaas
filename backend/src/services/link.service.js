import pool from "../config/db.js";

// CREATE
export const createLink = async (user_id, title, url) => {
  const [result] = await pool.query(
    "INSERT INTO links (user_id, title, url) VALUES (?, ?, ?)",
    [user_id, title, url]
  );

  return {
    id: result.insertId,
    user_id,
    title,
    url,
  };
};

// GET PRIVATE
export const getLinksByUser = async (user_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM links WHERE user_id = ? ORDER BY position",
    [user_id]
  );

  return rows;
};

// DELETE
export const deleteLink = async (id, user_id) => {
  await pool.query(
    "DELETE FROM links WHERE id = ? AND user_id = ?",
    [id, user_id]
  );
};

// 🌐 PUBLIC
export const getLinksByUsername = async (username) => {
  const [userRows] = await pool.query(
    "SELECT id, username FROM users WHERE username = ?",
    [username]
  );

  if (userRows.length === 0) return null;

  const user = userRows[0];

  const [links] = await pool.query(
    "SELECT id, title, url FROM links WHERE user_id = ? ORDER BY position",
    [user.id]
  );

  return {
    username: user.username,
    links,
  };
};