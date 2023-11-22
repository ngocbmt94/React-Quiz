function Options({ curQuestion, dispatch, answerOfUser }) {
  return (
    <div className="options">
      {curQuestion.options.map((op, i) => (
        <OptionItem key={i} option={op} curQuestion={curQuestion} indexOption={i} dispatch={dispatch} answerOfUser={answerOfUser} />
      ))}
    </div>
  );
}

function OptionItem({ option, curQuestion, indexOption, dispatch, answerOfUser }) {
  const hasAnswered = answerOfUser !== null;

  let resultClass = "";
  if (hasAnswered) {
    resultClass = indexOption === curQuestion.correctOption ? "correct" : "wrong";
  }

  return (
    <button className={`btn btn-option ${answerOfUser === indexOption ? "answer" : ""} ${resultClass}`} disabled={hasAnswered} onClick={() => dispatch({ type: "answer", payload: indexOption })}>
      {option}
    </button>
  );
}

export default Options;
