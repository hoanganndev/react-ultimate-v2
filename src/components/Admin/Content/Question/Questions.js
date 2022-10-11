import { useEffect, useState } from "react";
import Select from "react-select";
import Lightbox from "react-awesome-lightbox";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

//REACT ICONS
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";

import {
  getAllQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswersForQuestion,
} from "../../../../services/apiService";
import "./Questions.scss";
import { toast } from "react-toastify";

const Questions = () => {
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
  const [isPrevewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });
  const [questions, setQuestions] = useState(initQuestions);
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, []);

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

    //submit questions
    for (const question of questions) {
      const _question = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      //submit answers
      for (const answer of question.answers) {
        await postCreateNewAnswersForQuestion(
          answer.description,
          answer.isCorrect,
          +_question.DT.id
        );
      }
    }
    toast.success("Create new questions succed !");
    setQuestions(initQuestions);
  };

  return (
    <div className="question-container question">
      <div className="question__tittle">Manage questions</div>
      <hr />
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
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
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

export default Questions;
