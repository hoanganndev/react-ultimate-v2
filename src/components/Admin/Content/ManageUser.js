import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";

import ModalCreateUser from "./Modals/ModalCreateUser";
import TableUser from "./TableUser";
import { getAllUsers, getUsersWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./Modals/ModalUpdateUser";
import ModalDeleteUser from "./Modals/ModalDeleteUser";
import "./ManageUser.scss";

const ManageUser = () => {
  const LIMIT_USER = 6;
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [listUsers, setListUsers] = useState([]);

  //pagination
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetchListUser();
    fetchListUserWithPagination(1);
  }, []);

  const handleShowModalUser = () => {
    setShowModalCreateUser(!showModalCreateUser);
  };

  const handleShowModalUpdate = () => {
    setShowModalUpdateUser(!showModalUpdateUser);
  };

  const fetchListUser = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const fetchListUserWithPagination = async page => {
    let res = await getUsersWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleClickBtnUpdate = user => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  const handleClickBtnDelete = user => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };

  return (
    <>
      <div className="manage-user-container">
        <div className="title">Manager user</div>
        <div className="users-content">
          <div className="btn-add-new">
            <button
              className="btn btn-outline-primary"
              onClick={() => setShowModalCreateUser(true)}
            >
              <FcPlus />
              Add new
            </button>
          </div>
          <div className="table-users-container">
            <TableUser
              listUsers={listUsers}
              fetchListUserWithPagination={fetchListUserWithPagination}
              pageCount={pageCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleClickBtnUpdate={handleClickBtnUpdate}
              handleClickBtnDelete={handleClickBtnDelete}
            />
          </div>
        </div>
      </div>
      <ModalCreateUser
        show={showModalCreateUser}
        setShow={handleShowModalUser}
        fetchListUser={fetchListUser}
        fetchListUserWithPagination={fetchListUserWithPagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalUpdateUser
        show={showModalUpdateUser}
        dataUpdate={dataUpdate}
        setShow={handleShowModalUpdate}
        fetchListUser={fetchListUser}
        resetUpdateData={resetUpdateData}
        fetchListUserWithPagination={fetchListUserWithPagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalDeleteUser
        show={showModalDeleteUser}
        setShow={setShowModalDeleteUser}
        dataDelete={dataDelete}
        fetchListUser={fetchListUser}
        fetchListUserWithPagination={fetchListUserWithPagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default ManageUser;
