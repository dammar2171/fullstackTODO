import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import todoRoutes from "./src/routes/todo_routes.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT || 3000;

app.get("/user", (req,res)=>{
  res.send("server running sucessfulyy");
})

app.use("/todo",todoRoutes);

app.listen(PORT, ()=>{
  console.log(`server is running successfully on ${PORT}`);
})