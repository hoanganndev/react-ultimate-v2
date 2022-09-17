import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import _ from "lodash";

import { putUpdateUser } from "../../../../services/apiService";
import "./Modals.scss";

const ModalUpdateUser = ({
  show,
  setShow,
  fetchListUser,
  dataUpdate,
  resetUpdateData,
  fetchListUserWithPagination,
  currentPage,
  setCurrentPage,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setPassword("");
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("");
    setImage("");
    setPreviewImage("");
    //reset data update
    resetUpdateData();
  };

  const handleUploadImage = e => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitUpdateUser = async () => {
    let id = dataUpdate.id;
    let res = await putUpdateUser(id, username, role, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      //await fetchListUser();

      await fetchListUserWithPagination(currentPage);
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      className="modal-add-user"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update a user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              disabled
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              disabled
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Roles</label>
            <select
              className="form-select"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="col-md-12">
            <label htmlFor="upload-file" className="form-label label-upload">
              <FcPlus />
              Upload image
            </label>
            <input
              hidden
              type="file"
              className="form-control"
              id="upload-file"
              onChange={e => handleUploadImage(e)}
            />
          </div>
          <div className="col-md-12 img-preview">
            {previewImage ? (
              <img src={previewImage} alt="" />
            ) : (
              <span>Preview image ... </span>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdateUser;
