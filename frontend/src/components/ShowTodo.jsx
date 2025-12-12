import { useState } from "react";

function ShowTodo({ todo, updateTodo, deleteTodo }) {
  const [id, setId] = useState(null);
  const [tsk, setTsk] = useState("");
  const [date, setDate] = useState("");

  const handleEditForm = (e) => {
    e.preventDefault();
    updateTodo(id, { task: tsk, date });
  };

  const handleEditData = (item) => {
    setId(item.id);
    setTsk(item.task);
    setDate(item.date);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Task</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                {todo.length > 0 ? (
                  <tbody>
                    {Array.isArray(todo) &&
                      todo.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.task}</td>
                          <td>{new Date(item.date).toLocaleDateString()}</td>
                          <td>
                            <button
                              onClick={() => handleEditData(item)}
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#editModal"
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteTodo(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={4}>No todo is added yet!</td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
      {/* edit modal */}
      <div className="modal fade" id="editModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={handleEditForm}>
                <input
                  type="text"
                  value={tsk}
                  onChange={(e) => setTsk(e.target.value)}
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <input type="submit" value="Update" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowTodo;
