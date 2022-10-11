import _ from "lodash";
import { useEffect, useState } from "react";
import Lightbox from "react-awesome-lightbox";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

//REACT ICONS
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";

import { toast } from "react-toastify";
import {
  getAllQuizForAdmin,
  getQuizWithQA,
  postUpsertQA,
} from "../../../../services/apiService";
import "./QuizQA.scss";

const QuizQA = () => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        { id: uuidv4(), description: "", isCorrect: false },
        { id: uuidv4(), description: "", isCorrect: false },
      ],
    },
  ];
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });
  const [isPrevewImage, setIsPreviewImage] = useState(false);
  const [questions, setQuestions] = useState(initQuestions);
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  //return a promise that resolves with a File instance
  function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && +res.EC === 0) {
      //convert base64 to file object
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `question-${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `question-${q.id}.png`,
            "image/png"
          );
        }
        newQA.push(q);
      }
      setQuestions(newQA);
    }
  };

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && +res.EC == 0) {
      let newQuiz = res.DT.map((item, index) => {
        return {
          value: item.id,
          label: `${item.id}-${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [{ id: uuidv4(), description: "", isCorrect: false }],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let _questions = questions.filter(item => item.id !== id);
      setQuestions(_questions);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    if (type === "ADD") {
      let _questions = _.cloneDeep(questions);
      const newAnswer = { id: uuidv4(), description: "", isCorrect: false };
      let index = _questions.findIndex(item => item.id === questionId);
      _questions[index].answers.push(newAnswer);
      setQuestions(_questions);
    }
    if (type === "REMOVE") {
      let _questions = _.cloneDeep(questions);
      let index = _questions.findIndex(item => item.id === questionId);
      _questions[index].answers = _questions[index].answers.filter(
        item => item.id !== answerId
      );
      setQuestions(_questions);
    }
  };

  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let _questions = _.cloneDeep(questions);
      let index = _questions.findIndex(item => item.id === questionId);
      if (index > -1) {
        _questions[index].description = value;
        setQuestions(_questions);
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, e) => {
    let _questions = _.cloneDeep(questions);
    let index = _questions.findIndex(item => item.id === questionId);
    if (index > -1 && e?.target?.files[0]) {
      _questions[index].imageFile = e.target.files[0];
      _questions[index].imageName = e.target.files[0].name;
      setQuestions(_questions);
    }
  };

  const handleAnswerQuestion = (type, questionId, answerId, value) => {
    let _questions = _.cloneDeep(questions);
    let index = _questions.findIndex(item => item.id === questionId);
    if (index > -1) {
      _questions[index].answers = _questions[index].answers.map(answer => {
        if (answer.id === answerId) {
          if (type === "CHECKBOX") {
            answer.isCorrect = value;
          } else if (type === "TEXT") {
            answer.description = value;
          }
        }
        return answer;
      });
      setQuestions(_questions);
    }
  };

  const handlePreviewImage = questionId => {
    let _questions = _.cloneDeep(questions);
    let index = _questions.findIndex(item => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        title: _questions[index].imageName,
        url: URL.createObjectURL(_questions[index].imageFile),
      });
      setIsPreviewImage(true);
    }
  };

  const handleSaveQuestionsForQuiz = async () => {
    //validate
    if (_.isEmpty(selectedQuiz)) {
      toast.warning("Please choose a quiz !");
      return;
    }

    //validate answer
    let isValidAnswer = true;
    let isValidTick = true;
    let indexQuestion = 0,
      indexAnswer = 0;

    for (let i = 0; i < questions.length; i++) {
      let count = 0;
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (questions[i].answers[j].isCorrect) {
          count += 1;
        }
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexAnswer = j;
          break;
        }
      }
      indexQuestion = i;
      if (count === 0) {
        isValidTick = false;
        break;
      }
      if (!isValidAnswer) break;
    }

    if (!isValidAnswer) {
      toast.warning(
        `Not empty anser ${indexAnswer + 1} at Question ${indexQuestion + 1}`
      );
      return;
    }

    if (!isValidTick) {
      toast.warning(
        `Question ${indexQuestion + 1}:At least 1 Answer for each question !`
      );
      return;
    }

    //validate questions
    let isValidQuestion = true;
    let indexQues = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQues = i;
        break;
      }
    }
    if (!isValidQuestion) {
      toast.warning(`Not empty desciption for question ${indexQues + 1}`);
      return;
    }

    let _questions = _.cloneDeep(questions);
    for (let i = 0; i < _questions.length; i++) {
      if (_questions[i].imageFile) {
        //convert file to base64
        _questions[i].imageFile = toBase64(_questions[i].imageFile);
      }
    }

    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: _questions,
    });
    console.log("check _questions", _questions);
    if (res && +res.EC === 0) {
      fetchQuizWithQA();
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  const toBase64 = file => {
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  console.log("check questions", questions);

  return (
    <div className="question-container question">
      <div className="question__add-new">
        <div className="col-6 form-group">
          <label className="mb-2">Select quiz:</label>
          <Select value={selectedQuiz} onChange={setSelectedQuiz} options={listQuiz} />
        </div>
        <div className="mt-3 mb-2">
          Add quetions:
          {questions &&
            questions.length > 0 &&
            questions.map((question, index) => {
              return (
                <div key={`question-${question.id}`} className="question-main mb-4">
                  <div className="question__content">
                    <div className="form-floating mb-3 question__content__desc">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        value={question.description}
                        onChange={e =>
                          handleOnChange("QUESTION", question.id, e.target.value)
                        }
                      />
                      <label htmlFor="floatingInput">
                        Question {index + 1}'s description
                      </label>
                    </div>
                    <div className="question__content__group-upload">
                      <label htmlFor={question.id} className="lable-upload">
                        <RiImageAddFill className="label-upload" />
                      </label>
                      <input
                        id={question.id}
                        type="file"
                        hidden
                        onChange={e => handleOnChangeFileQuestion(question.id, e)}
                      />
                      <span>
                        {question.imageName ? (
                          <span onClick={() => handlePreviewImage(question.id)}>
                            {question.imageName}
                          </span>
                        ) : (
                          "0 file is uploaded"
                        )}
                      </span>
                    </div>
                    <div className="question__content__btn-add">
                      <span onClick={() => handleAddRemoveQuestion("ADD")}>
                        <BsFillPatchPlusFill className="icon-add" />
                      </span>
                      {questions.length > 1 && (
                        <span
                          onClick={() => handleAddRemoveQuestion("REMOVE", question.id)}
                        >
                          <BsPatchMinusFill className="icon-remove" />
                        </span>
                      )}
                    </div>
                  </div>

                  {question.answers &&
                    question.answers.length > 0 &&
                    question.answers.map((answer, index) => {
                      return (
                        <div key={answer.id} className="answers__content">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={answer.isCorrect}
                            onChange={e =>
                              handleAnswerQuestion(
                                "CHECKBOX",
                                question.id,
                                answer.id,
                                e.target.checked
                              )
                            }
                          />
                          <div className="form-floating answer-name">
                            <input
                              value={answer.description}
                              type="text"
                              className="form-control iscorrect"
                              id="floatingInput"
                              onChange={e =>
                                handleAnswerQuestion(
                                  "TEXT",
                                  question.id,
                                  answer.id,
                                  e.target.value
                                )
                              }
                            />
                            <label htmlFor="floatingInput">Anser {index + 1}</label>
                          </div>
                          <div className="btn-group">
                            <span
                              onClick={() => handleAddRemoveAnswer("ADD", question.id)}
                            >
                              <AiOutlinePlusCircle className="icon-add" />
                            </span>

                            {question.answers.length > 1 && (
                              <span
                                onClick={() =>
                                  handleAddRemoveAnswer("REMOVE", question.id, answer.id)
                                }
                              >
                                <AiOutlineMinusCircle className="icon-remove" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          {questions && questions.length > 0 && (
            <div>
              <button
                className="btn btn-outline-warning"
                onClick={() => handleSaveQuestionsForQuiz()}
              >
                Save Questions
              </button>
            </div>
          )}
          {isPrevewImage === true && (
            <Lightbox
              image={dataImagePreview.url ? dataImagePreview.url : ""}
              title={dataImagePreview.title ? dataImagePreview.title : ""}
              onClose={() => setIsPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizQA;
