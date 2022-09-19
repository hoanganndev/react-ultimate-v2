import React, { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";

const TableQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && +res.EC == 0) {
      setListQuiz(res.DT);
    }
  };
  return (
    <>
      <div className="mt-5">List quizzes:</div>
      <table className="table table-hover table-bordered my-2 table-quiz">
        <thead className="table-danger">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((quiz, index) => {
              return (
                <tr key={`quiz-${quiz?.id}`}>
                  <td>{quiz?.id}</td>
                  <td>{quiz?.name}</td>
                  <td>{quiz?.description}</td>
                  <td>{quiz?.difficulty}</td>
                  <td className="table-actions">
                    <button className="btn btn-outline-warning">Edit</button>
                    <button className="btn btn-outline-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
