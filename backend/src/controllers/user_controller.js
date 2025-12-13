import db from "../config/db.js";
import jwt from "jsonwebtoken";

export const insertUser=(req,res)=>{
  const {fullname,email,number,password}=req.body;

  const sql="INSERT INTO todo_signup(fullname,email,number,password) VALUES(?,?,?,?)";
  db.query(sql,[fullname,email,number,password],(err,result)=>{
    if(err){
      console.log("INSERTION FAILED!",err);
      return res.status(500).json({message:"problem in insertion!!"});
    }
    return res.status(200).json({message:"Data inserted sucessfully"});
  })
}


export const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM todo_signup WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.log("Login error", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  });
};