import _ from "lodash";
import React from "react";

const Question = ({ data, index, handleCheckbox }) => {
  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleAnswerCheckbox = (e, answerId, questionId) => {
    handleCheckbox(answerId, questionId);
  };

  return (
    <>
      {data?.image ? (
        <div className="question-image">
          <img src={`data:image/jpeg;base64,${data?.image}`} alt="" />
        </div>
      ) : (
        <div className="question-image"></div>
      )}
      <div className="question">
        Question {index + 1}: {data?.questionDesc} ?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((answer, index) => {
            return (
              <div key={`answer-${index}`} className="answer__child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`checkbox-${index}`}
                    checked={answer.isSelected}
                    onChange={e =>
                      handleAnswerCheckbox(e, `${answer.id}`, `${data.questionId}`)
                    }
                  />
                  <label className="form-check-label" htmlFor={`checkbox-${index}`}>
                    {answer?.description}
                  </label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
