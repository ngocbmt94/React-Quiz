import Header from "./Header";
import Error from "./Error";
import Loader from "./Loader";
import Main from "./Main";
import Question from "./Question";
import StartScreen from "./StartScreen";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Timer from "./Timer";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";

import { useEffect, useReducer } from "react";

const SECONDS_PER_QUESTION = 30;
const initstate = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished : handling different status
  indexQuestion: 0,
  answerOfUser: null,
  score: 0,
  highScore: JSON.parse(localStorage.getItem("highScore")) || 0,
  secondsRemaining: null,
};
function reducer(curState, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...curState, status: "ready", questions: action.payload };
    case "dataFailed":
      return { ...curState, status: "error" };
    case "start":
      return { ...curState, status: "action", secondsRemaining: curState.questions.length * SECONDS_PER_QUESTION };
    case "answer":
      const curQuestion = curState.questions[curState.indexQuestion];

      return { ...curState, answerOfUser: action.payload, score: curQuestion?.correctOption === action.payload ? curState.score + curQuestion.points : curState.score };
    case "nextQuestion":
      return { ...curState, indexQuestion: curState.indexQuestion === curState.questions.length - 1 ? 0 : curState.indexQuestion + 1, answerOfUser: null };
    case "finished":
      const calculatorHighScore = curState.highScore < curState.score ? curState.score : curState.highScore;
      localStorage.setItem("highScore", JSON.stringify(calculatorHighScore));
      return { ...curState, status: "finished", highScore: calculatorHighScore };
    case "reset":
      return { ...initstate, questions: curState.questions, status: "ready" };
    case "tick":
      return { ...curState, secondsRemaining: curState.secondsRemaining - 1, status: curState.secondsRemaining === 0 ? "finished" : curState.status };
    default:
      throw new Error("ACTION UNKNOWN");
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initstate);
  const { questions, status, indexQuestion, answerOfUser, score, highScore, secondsRemaining } = state;

  const numberQuestion = questions.length;
  const totalScore = questions.reduce((accumulator, currentValue) => currentValue.points + accumulator, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => {
        dispatch({ type: "dataFailed" });
        console.error(err);
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numberQuestion={numberQuestion} dispatch={dispatch} />}
        {status === "action" && (
          <>
            <Progress score={score} indexQuestion={indexQuestion} numberQuestion={numberQuestion} totalScore={totalScore} answerOfUser={answerOfUser} />
            <Question curQuestion={questions[indexQuestion]} dispatch={dispatch} answerOfUser={answerOfUser} score={score} />

            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton dispatch={dispatch} answerOfUser={answerOfUser} indexQuestion={indexQuestion} numberQuestion={numberQuestion} />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen score={score} totalScore={totalScore} highScore={highScore} dispatch={dispatch} />}
      </Main>
    </div>
  );
}
