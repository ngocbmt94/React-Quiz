import Options from "./Options";

function Question({ curQuestion, dispatch, answerOfUser }) {
  return (
    <div>
      <h4>{curQuestion.question}</h4>
      <Options curQuestion={curQuestion} answerOfUser={answerOfUser} dispatch={dispatch} />
    </div>
  );
}

export default Question;
