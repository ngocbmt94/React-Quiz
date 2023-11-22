function NextButton({ dispatch, answerOfUser, indexQuestion, numberQuestion }) {
  if (answerOfUser === null) return null;

  if (indexQuestion === numberQuestion - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "finished" })}>
        Finish
      </button>
    );

  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>
      Next
    </button>
  );
}

export default NextButton;
