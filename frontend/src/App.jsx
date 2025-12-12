import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TodoContainer from "./components/TodoContainer";
import { useState } from "react";
import ShowTodo from "./components/ShowTodo";

function App() {
  const [showTodo, setShowTodo] = useState(false);
  const [todo, setTodo] = useState([]);

  const updateTodo = (id, updatedItem) => {
    setTodo((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteTodo = (id) => {
    const okay = confirm("Are you sure");
    if (okay) {
      const newTodo = todo.filter((todo) => todo.id !== id);
      setTodo(newTodo);
    }
  };

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
