import pool from "../config/db.js";  

export const insertTodo = async (req, res) => {
  const { task, date } = req.body;
  const userId = req.user.id;

  const sql = "INSERT INTO todo_user (task, date, user_id) VALUES ($1, $2, $3)";
  try {
    await pool.query(sql, [task, date, userId]);
    res.status(200).json({ message: "Todo added" });
  } catch (err) {
    console.error("Insert failed:", err);
    res.status(500).json({ message: "Insert failed" });
  }
};

export const getTodo = async (req, res) => {
  const sql = "SELECT * FROM todo_user WHERE user_id = $1";
  try {
    const result = await pool.query(sql, [req.user.id]);
    res.json(result.rows); 
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Fetch error" });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task, date } = req.body;

  const sql = "UPDATE todo_user SET task=$1, date=$2 WHERE id=$3 AND user_id=$4";
  try {
    const result = await pool.query(sql, [task, date, id, req.user.id]);
    if (result.rowCount === 0) {
      return res.status(403).json({ message: "Not allowed" });
    }
    res.json({ message: "Updated" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM todo_user WHERE id=$1 AND user_id=$2";
  try {
    const result = await pool.query(sql, [id, req.user.id]);
    if (result.rowCount === 0) {
      return res.status(403).json({ message: "Not allowed" });
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};