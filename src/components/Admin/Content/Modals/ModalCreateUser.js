import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";

import { postCreateNewUser } from "../../../../services/apiService";
import "./Modals.scss";

const ModalCreateUser = ({ show, setShow, fetchListUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("");
    setImage("");
    setPreviewImage("");
  };

  const handleUploadImage = e => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitCreateUser = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.warning("Invalid email ...");
      return;
    }
    if (!password) {
      toast.warning("Invalid password ...");
      return;
    }
    let res = await postCreateNewUser(email, password, username, role, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await fetchListUser();
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
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
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
              <option value="USER" selected>
                USER
              </option>
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
        <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreateUser;
