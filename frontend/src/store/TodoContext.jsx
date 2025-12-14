import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [showTodo, setShowTodo] = useState(false);
  const [todo, setTodo] = useState([]);
  const [autenticated, setAutenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAutenticated(true);
    setCheckingAuth(false);
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todo,
        showTodo,
        autenticated,
        checkingAuth,
        setAutenticated,
        deleteTodo,
        updateTodo,
        setShowTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
export default TodoContextProvider;
