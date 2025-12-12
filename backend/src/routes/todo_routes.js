import {insertTodo, getTodo,updateTodo,deleteTodo} from "../controllers/todo_controller.js";
import express from "express";

const router = express.Router();

router.post("/insert",insertTodo);
router.get("/getTodo",getTodo);
router.put("/updateTodo/:id",updateTodo);
router.delete("/deleteTodo/:id",deleteTodo);

export default router;