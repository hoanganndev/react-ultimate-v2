import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

import {
  getAllQuizForAdmin,
  getAllUsers,
  postAssignQuiz,
} from "../../../../services/apiService";
import "./AssignQuiz.scss";

const AssignQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  useEffect(() => {
    fetchQuiz();
    fetchUser();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && +res.EC == 0) {
      let quizzes = res.DT.map((item, index) => {
        return {
          value: item.id,
          label: `${item.id}-${item.name}`,
        };
      });
      setListQuiz(quizzes);
    }
  };

  const fetchUser = async () => {
    let res = await getAllUsers();
    if (res && +res.EC == 0) {
      let users = res.DT.map((item, index) => {
        return {
          value: item.id,
          label: `${item.id}-${item.username}-${item.email}`,
        };
      });
      setListUser(users);
    }
  };

  const handleAssign = async () => {
    if (selectedQuiz.value && selectedUser.value) {
      let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
      if (+res.EC === 0) {
        toast.success(res.EM);
      } else {
        toast.error(res.EM);
      }
    }
  };
  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-2">Select quiz:</label>
        <Select value={selectedQuiz} onChange={setSelectedQuiz} options={listQuiz} />
      </div>
      <div className="col-6 form-group">
        <label className="mb-2">Select user:</label>
        <Select value={selectedUser} onChange={setSelectedUser} options={listUser} />
      </div>
      <div>
        <button className="btn btn-outline-warning mt-3" onClick={() => handleAssign()}>
          Assign
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;
