import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";

import ModalCreateUser from "./Modals/ModalCreateUser";
import TableUser from "./TableUser";
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from "./Modals/ModalUpdateUser";
import ModalDeleteUser from "./Modals/ModalDeleteUser";
import "./ManageUser.scss";

const ManageUser = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUser();
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
      />
      <ModalUpdateUser
        show={showModalUpdateUser}
        dataUpdate={dataUpdate}
        setShow={handleShowModalUpdate}
        fetchListUser={fetchListUser}
        resetUpdateData={resetUpdateData}
      />
      <ModalDeleteUser
        show={showModalDeleteUser}
        setShow={setShowModalDeleteUser}
        dataDelete={dataDelete}
        fetchListUser={fetchListUser}
      />
    </>
  );
};

export default ManageUser;
