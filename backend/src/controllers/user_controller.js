import pool from "../config/db.js";
import jwt from "jsonwebtoken";

export const insertUser = async (req, res) => {
  const { fullname, email, number, password } = req.body;
  const sql = "INSERT INTO todo_signup(fullname,email,number,password) VALUES($1,$2,$3,$4)";
  try {
    await pool.query(sql, [fullname, email, number, password]);
    return res.status(200).json({ message: "Data inserted sucessfully" });
  } catch (err) {
    console.error("INSERTION FAILED!", err);
    return res.status(500).json({ message: "problem in insertion!!" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM todo_signup WHERE email = $1";
  try {
    const result = await pool.query(sql, [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = result.rows[0];
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user.id, name: user.fullname },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({ message: "Server error" });
  }
};