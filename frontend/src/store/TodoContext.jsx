import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [todo, setTodo] = useState([]);
  const [showTodo, setShowTodo] = useState(false);
  const [autenticated, setAutenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // attach JWT token automatically
  const authHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  //Fetch todos (USER-SPECIFIC)
  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(
        "http://localhost:5000/todo/getTodo",
        authHeader()
      );
      setTodo(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  // Add todo
  const insertTodo = async (task, date) => {
    try {
      await axios.post(
        "http://localhost:5000/todo/insert",
        { task, date },
        authHeader()
      );
      fetchTodos(); // refresh list
    } catch (err) {
      console.log("Insert error:", err);
    }
  };

  // Update todo
  const updateTodo = async (id, updatedItem) => {
    try {
      await axios.put(
        `http://localhost:5000/todo/updateTodo/${id}`,
        updatedItem,
        authHeader()
      );

      setTodo((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        )
      );
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/todo/deleteTodo/${id}`,
        authHeader()
      );
      setTodo((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // Initial auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAutenticated(true);
    setCheckingAuth(false);
  }, []);

  // Load todos after login
  useEffect(() => {
    if (autenticated) {
      console.log(autenticated);
      fetchTodos();
    } else {
      setTodo([]);
    }
  }, [autenticated]);
  return (
    <TodoContext.Provider
      value={{
        todo,
        showTodo,
        setShowTodo,
        autenticated,
        checkingAuth,
        setTodo,
        setAutenticated,
        fetchTodos,
        insertTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
