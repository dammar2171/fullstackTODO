import { useContext, useState } from "react";
import { TodoContext } from "../store/TodoContext";
import "../css/ShowTodo.css";

function ShowTodo() {
  const [search, setSearch] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);

  const { todo, updateTodo, deleteTodo } = useContext(TodoContext);
  const [id, setId] = useState(null);
  const [tsk, setTsk] = useState("");
  const [date, setDate] = useState("");

  const filteredTodos = Array.isArray(todo)
    ? todo.filter((item) =>
        item.task.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleEditForm = (e) => {
    e.preventDefault();
    console.log(tsk, date);

    updateTodo(id, { task: tsk, date });
    alert("updated sucessfully");
  };

  const handleEditData = (item) => {
    setId(item.id);
    setTsk(item.task);
    setDate(item.date);
  };

  return (
    <>
      <div className="container-fluid todo-page">
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="todo-card">
                <h3 className="todo-title">My Todos</h3>
                <div className="d-flex justify-content-center align-items-center">
                  <form
                    className="search-form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="search"
                      placeholder="🔍 Search todos here ..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setShowSearchModal(e.target.value.length > 0);
                      }}
                    />
                  </form>
                </div>
                <table className="table todo-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Task</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(todo) && todo.length > 0 ? (
                      todo.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.task}</td>
                          <td>{new Date(item.date).toLocaleDateString()}</td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm me-2"
                              onClick={() => handleEditData(item)}
                              data-bs-toggle="modal"
                              data-bs-target="#editModal"
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteTodo(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="empty-text">
                          No todo is added yet!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content todo-modal">
            <div className="modal-header">
              <h5 className="modal-title">Edit Todo</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleEditForm}>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={tsk}
                  onChange={(e) => setTsk(e.target.value)}
                  placeholder="Task"
                />

                <input
                  type="date"
                  className="form-control mb-3"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                <button type="submit" className="btn btn-primary w-100">
                  Update Todo
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showSearchModal && (
        <div
          className="search-modal-overlay"
          onClick={() => setShowSearchModal(false)}
        >
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <h5>Search Results</h5>

            {filteredTodos.length > 0 ? (
              <table className="table todo-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Task</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTodos.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.task}</td>
                      <td>{new Date(item.date).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handleEditData(item)}
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteTodo(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="empty-text">No matching todo found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ShowTodo;
