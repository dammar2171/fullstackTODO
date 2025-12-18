import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./src/routes/todo_routes.js";
import userRoutes from "./src/routes/user_routes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/user", (req, res) => {
  res.send("server running successfully");
});

app.use("/todo", todoRoutes);
app.use("/signup", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running successfully on ${PORT}`);
});
