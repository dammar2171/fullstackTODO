import express from "express";
import {
  insertTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo_controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/insert", authMiddleware, insertTodo);
router.get("/getTodo", authMiddleware, getTodo);
router.put("/updateTodo/:id", authMiddleware, updateTodo);
router.delete("/deleteTodo/:id", authMiddleware, deleteTodo);

export default router;
