import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

import { getDataQuiz, postSubmitQuiz } from "../../../services/apiService";
import Question from "./Question";
import ModalResult from "../Modals/ModalResult";
import "./DetailQuiz.scss";

const DetailQuiz = () => {
  const param = useParams();
  const location = useLocation();
  const quizId = +param.id;

  //state
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let rawData = res.DT;
      let data = _.chain(rawData)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDesc,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDesc = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          return { questionId: +key, answers, questionDesc, image };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };

  const handleCheckbox = (answerId, questionId) => {
    let _dataQuiz = _.cloneDeep(dataQuiz);
    let question = _dataQuiz.find(item => +item.questionId === +questionId);
    if (question && question.answers) {
      let _question = question.answers.map(item => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      question.answers = _question;
    }
    let index = _dataQuiz.findIndex(item => +item.questionId === +questionId);
    if (index !== -1) {
      _dataQuiz[index] = question;
      setDataQuiz(_dataQuiz);
    }
  };

  const handleFinishQuiz = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let _answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach(question => {
        let questionId = question.questionId;
        let userAnswerId = [];
        question.answers.forEach(answer => {
          if (answer.isSelected) {
            userAnswerId.push(answer.id);
          }
        });
        _answers.push({ questionId, userAnswerId });
      });
      payload.answers = _answers;
      //submit
      const res = await postSubmitQuiz(payload);
      if (res && +res.EC === 0) {
        setIsShowModalResult(true);
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        toast.success(res.EM);
      } else {
        toast.error(res.EM);
      }
    }
  };

  return (
    <>
      <div className="detailquiz-container detailquiz">
        <div className="detailquiz-left">
          <div className="detailquiz-left__title">
            Quiz {quizId}: {location?.state?.quizTitle}
          </div>
          <hr />
          <div className="detailquiz-left__body">
            <img src="" alt="" />
          </div>
          <div className="detailquiz-left__content">
            <Question
              handleCheckbox={handleCheckbox}
              index={index}
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            />
          </div>
          <div className="detailquiz-left__footer">
            <button className="btn btn-outline-secondary" onClick={() => handlePrev()}>
              Prev
            </button>
            <button className="btn btn-outline-primary" onClick={() => handleNext()}>
              Next
            </button>
            <button
              className="btn btn-outline-warning"
              onClick={() => handleFinishQuiz()}
            >
              Finish
            </button>
          </div>
        </div>
        <div className="detailquiz-right">countdown</div>
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </>
  );
};

export default DetailQuiz;
