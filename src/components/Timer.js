import { useEffect } from "react";
function Timer({ secondsRemaining, dispatch }) {
  let minutes = Math.floor(secondsRemaining / 60);
  let seconds = Math.floor(secondsRemaining % 60);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  useEffect(
    function () {
      const timeID = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(timeID);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {minutes} : {seconds}
    </div>
  );
}

export default Timer;
