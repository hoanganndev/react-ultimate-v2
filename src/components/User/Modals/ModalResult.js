import React from "react";
import { Modal, Button } from "react-bootstrap";

import { toast } from "react-toastify";

const ModalResult = ({ show, setShow, dataModalResult }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Your results ... </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="">
          Total questions: <b>{dataModalResult.countTotal}</b>
        </div>
        <div className="">
          Total correct answers: <b>{dataModalResult.countCorrect}</b>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Show answers
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalResult;
