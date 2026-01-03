import { useRef, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../store/TodoContext";

function TodoContainer() {
  const { setShowTodo, setTodo } = useContext(TodoContext);
  const navigate = useNavigate();
  const taskElement = useRef();
  const dateElement = useRef();

  const [user, setUser] = useState({});

  const handleForm = async (e) => {
    e.preventDefault();
    const task = taskElement.current.value;
    const date = dateElement.current.value;

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/todo/insert",
        { task, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Data submitted successfully");
    } catch (error) {
      console.log("ERROR:", error);
    }

    taskElement.current.value = "";
    dateElement.current.value = "";
  };

  const handleHideData = () => {
    setShowTodo(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowTodo(false);
    setTodo([]);
    navigate("/");
  };

  return (
    <div className="container-fluid pt-5">
      <div className="container">
        <h1 className="text-center">
          Welcome to TODO APP {user.name}{" "}
          <span>
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          </span>
        </h1>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <form onSubmit={handleForm}>
              <div className="mb-3">
                <label htmlFor="task" className="form-label">
                  Task
                </label>
                <input
                  type="text"
                  ref={taskElement}
                  className="form-control"
                  id="task"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  ref={dateElement}
                  className="form-control"
                  id="date"
                />
              </div>
              <div className="mb-3">
                <input type="submit" className="form-control" />
              </div>
            </form>
            <div className="d-flex">
              <button
                onClick={() => setShowTodo(true)}
                className="form-control bg-success"
              >
                View Todo
              </button>
              <button
                onClick={handleHideData}
                className="form-control bg-secondary"
              >
                Hide Todo
              </button>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}

export default TodoContainer;
