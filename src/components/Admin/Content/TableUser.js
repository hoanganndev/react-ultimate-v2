import ReactPaginate from "react-paginate";

const TableUser = ({
  listUsers,
  handleClickBtnUpdate,
  handleClickBtnDelete,
  fetchListUserWithPagination,
  pageCount,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageClick = e => {
    fetchListUserWithPagination(+e.selected + 1);
    setCurrentPage(+e.selected + 1);
  };
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
      <div className="user-pagination">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </div>
  );
};

export default TableUser;
