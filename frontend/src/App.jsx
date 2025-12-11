import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TodoContainer from "./components/TodoContainer";
import { useState } from "react";
import ShowTodo from "./components/ShowTodo";

function App() {
  const [showTodo, setShowTodo] = useState(false);
  const [todo, setTodo] = useState([]);

  return (
    <>
      <TodoContainer setShowTodo={setShowTodo} setTodo={setTodo} />
      {showTodo && <ShowTodo todo={todo} />}
    </>
  );
}

export default App;
