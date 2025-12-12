import db from "../config/db.js";

export const insertTodo = (req, res) => {
  const { task, date } = req.body;

  if (!task || !date) {
    return res.status(400).json({ message: "Missing task or date" });
  }
  const sql = "INSERT INTO todo_user (`task`, `date`) VALUES ( ?, ?)";
  db.query(sql, [task, date], (err, result) => {
    if (err) {
      console.log("Insertion failed:", err);
      return res.status(500).json({ message: "Insertion failed in database" });
    }
    return res
      .status(200)
      .json({ message: "Data inserted successfully in database" });
  });
};

export const getTodo=(req,res)=>{
    const sql="Select * from todo_user";

    db.query(sql,(err,result)=>{
      if(err){
        console.log("Data fetching error :",err);
        return res.status(500).json({message:"Error in fetching!!"});
      }
      res.status(200).json(result);
    })
}

export const updateTodo=(req,res)=>{
  const {id}= req.params;
  const {task,date}=req.body;

  const sql="UPDATE todo_user SET task = ?, date = ? WHERE id = ?";
  db.query(sql,[task,date,id],(err,result)=>{
    if(err){
      console.log("Update failed",err);
      return res.status(500).json({
        message:"problem in updation"
      });
    }
    return res.status(200).json({message:"data updated sucessfully"});
  })
}

export const deleteTodo=(req,res)=>{
  const {id}=req.params;

  const sql="DELETE from todo_user where id=?";
  db.query(sql,[id],(err,result)=>{
    if(err){
      console.log("Error in deletion",err);
      return res.status(500).json({message:"problem in deletion!!"});
    }
    return res.status(200).json({message:"Deleted sucessfully"});
  })
}
