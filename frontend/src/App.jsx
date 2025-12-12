import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TodoContainer from "./components/TodoContainer";
import { useState } from "react";
import ShowTodo from "./components/ShowTodo";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [showTodo, setShowTodo] = useState(false);
  const [todo, setTodo] = useState([]);

  const updateTodo = async (id, updatedItem) => {
    const { task, date } = updatedItem;
    try {
      await axios.put(`http://localhost:5000/todo/updateTodo/${id}`, {
        task,
        date,
      });
    } catch (error) {
      console.log("ERROR:", error);
    }
    setTodo((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteTodo = async (id) => {
    const okay = confirm("Are you sure");
    if (okay) {
      try {
        await axios.delete(`http://localhost:5000/todo/deleteTodo/${id}`);
      } catch (error) {
        console.log("ERROR:", error);
      }
      const newTodo = todo.filter((item) => item.id !== id);
      setTodo(newTodo);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/todo/getTodo");
        setTodo(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      <TodoContainer setShowTodo={setShowTodo} setTodo={setTodo} />
      {showTodo && (
        <ShowTodo todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      )}
    </>
  );
}

export default App;
