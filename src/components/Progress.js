function Progress({ indexQuestion, score, numberQuestion, totalScore, answerOfUser }) {
  return (
    <div className="progress">
      <progress max={numberQuestion} value={answerOfUser !== null ? indexQuestion + 1 : indexQuestion}></progress>

      <p>
        Question {indexQuestion + 1} / {numberQuestion}
      </p>
      <p>
        {score} / {totalScore} points
      </p>
    </div>
  );
}

export default Progress;
