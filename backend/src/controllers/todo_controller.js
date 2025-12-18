import db from "../config/db.js";

  export const insertTodo = (req, res) => {
  const { task, date } = req.body;
  const userId = req.user.id;

  const sql =
    "INSERT INTO todo_user (task, date, user_id) VALUES (?, ?, ?)";
  db.query(sql, [task, date, userId], (err) => {
    if (err) return res.status(500).json({ message: "Insert failed" });
    res.status(200).json({ message: "Todo added" });
  });
};

export const getTodo = (req, res) => {
  const sql = "SELECT * FROM todo_user WHERE user_id = ?";
  db.query(sql, [req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Fetch error" });
    res.json(result);
  });
};

export const updateTodo = (req, res) => {
  const { id } = req.params;
  const { task, date } = req.body;

  const sql =
    "UPDATE todo_user SET task=?, date=? WHERE id=? AND user_id=?";
  db.query(sql, [task, date, id, req.user.id], (err, result) => {
    if (err || result.affectedRows === 0)
      return res.status(403).json({ message: "Not allowed" });
    res.json({ message: "Updated" });
  });
};

export const deleteTodo = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM todo_user WHERE id=? AND user_id=?";
  db.query(sql, [id, req.user.id], (err, result) => {
    if (err || result.affectedRows === 0)
      return res.status(403).json({ message: "Not allowed" });
    res.json({ message: "Deleted" });
  });
};
