const TableUser = ({ listUsers, handleClickBtnUpdate, handleClickBtnDelete }) => {
  return (
    <div>
      <table className="table table-striped table-hover table-bordered">
        <thead className="table-warning">
          <tr>
            <th scope="col">NO</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 ? (
            listUsers.map((user, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-secondary">View</button>
                    <button
                      className="btn btn-outline-warning mx-3"
                      onClick={() => handleClickBtnUpdate(user)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleClickBtnDelete(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-center" colSpan="4">
                Not found data...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
