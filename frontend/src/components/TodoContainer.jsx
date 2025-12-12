import { useRef } from "react";
import axios from "axios";

function TodoContainer({ setShowTodo }) {
  const taskElement = useRef();
  const dateElement = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    const task = taskElement.current.value;
    const date = dateElement.current.value;

    const data = { task, date };

    try {
      await axios.post("http://localhost:5000/todo/insert", data);
      alert("Data submited sucessfully");
    } catch (error) {
      console.log("ERROR:", error);
    }
    taskElement.current.value = "";
    dateElement.current.value = "";
  };
  const handleHideData = () => {
    setShowTodo(false);
  };
  return (
    <div className="container-fluid">
      <div className="container">
        <h1 className="text-center mt-4">TODO APP</h1>
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
                View Data
              </button>
              <button
                onClick={handleHideData}
                className="form-control bg-secondary"
              >
                Hide Data
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
