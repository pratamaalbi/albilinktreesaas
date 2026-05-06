import pool from "../config/db.js";

// REGISTER
export const createUser = async (username, email, password) => {
  const [result] = await pool.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password]
  );

  return {
    id: result.insertId,
    username,
    email,
    password,
  };
};

// LOGIN
export const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return rows[0];
};