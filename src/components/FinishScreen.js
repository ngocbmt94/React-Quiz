function FinishScreen({ dispatch, score, totalScore, highScore }) {
  const percentage = Math.ceil((score / totalScore) * 100);

  return (
    <div>
      <p className="result">
        Your scored {score} out of {totalScore} ({percentage} %)
      </p>
      <p className="highscore">Hight Score: {highScore} points</p>

      <button className="btn btn-ui" onClick={() => dispatch({ type: "reset" })}>
        Reset Quiz
      </button>
    </div>
  );
}

export default FinishScreen;
