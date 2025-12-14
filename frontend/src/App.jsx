import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TodoContainer from "./components/TodoContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowTodo from "../src/components/ShowTodo";
import Authentication from "./components/Authentication";
import ProtectedRoutes from "./components/ProtectedRoutes";
import TodoContextProvider, { TodoContext } from "./store/TodoContext";
import { useContext } from "react";

export default function App() {
  return (
    <TodoContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route
            path="/todo"
            element={
              <ProtectedRoutes>
                <TodoWrapper />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </TodoContextProvider>
  );
}

const TodoWrapper = () => {
  const { showTodo } = useContext(TodoContext);
  return (
    <>
      <TodoContainer />
      {showTodo && <ShowTodo />}
    </>
  );
};
