import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import Accordion from "react-bootstrap/Accordion";

import "./ManageQuiz.scss";
import { postCreateNewQuiz } from "../../../../services/apiService";
import TableQuiz from "./TableQuiz";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

const ManageQuiz = () => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  //state
  const [name, setName] = useState("");
  const [description, setDesciption] = useState("");
  const [type, setType] = useState({});
  const [image, setImage] = useState(null);

  const handleChangeFile = e => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!name || !description) {
      toast.error("Name/description is required !");
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-container quiz">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage quizzes</Accordion.Header>
          <Accordion.Body>
            <div className="quiz__addNew">
              <fieldset className="border rounded-3 p-3" legend="true">
                <legend className="float-none w-auto px-3">Add New Quiz</legend>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="text"
                    id="description"
                    value={description}
                    onChange={e => setDesciption(e.target.value)}
                  />
                  <label htmlFor="description">Description</label>
                </div>
                <div className="my-3">
                  <Select
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder={"Quiz type ..."}
                  />
                </div>
                <div className="more-actions form-group">
                  <label htmlFor="" className="mb-2">
                    Upload image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={e => handleChangeFile(e)}
                  />
                </div>
                <div>
                  <button
                    className="btn btn-outline-warning mt-3"
                    onClick={() => handleSubmitQuiz()}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="quiz__listDetail container">
              <TableQuiz />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        {/* Quiz question and answer */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Update Q&A Quizzes</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        {/* Assign quiz to user  */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Assign to Users</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
