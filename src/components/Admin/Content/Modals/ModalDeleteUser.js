import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteUser } from "../../../../services/apiService";

import { toast } from "react-toastify";

const ModalDeleteUser = ({
  show,
  setShow,
  dataDelete,
  fetchListUser,
  fetchListUserWithPagination,
  currentPage,
  setCurrentPage,
}) => {
  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async () => {
    let userId = dataDelete.id;
    let res = await deleteUser(userId);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      //await fetchListUser();
      setCurrentPage(1); // set bằng 1 để pagination quay về trang đầu tiên sau khi delete
      await fetchListUserWithPagination(1);
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete user </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure to delete this user:{" "}
        <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteUser;
