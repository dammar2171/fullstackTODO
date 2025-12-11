function ShowTodo({ todo }) {
  return (
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
                        <td>{item.date}</td>
                        <td>
                          <button className="btn btn-primary">Edit</button>
                          <button className="btn btn-danger">Delete</button>
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
  );
}

export default ShowTodo;
