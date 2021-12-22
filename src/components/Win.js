const WinLogic = ({ scores, moves, endGame, restart, pause }) => {
  return (
    <div className="score-board">
      <h2>{endGame ? "Your score is " + scores : " Enjoy playing"}</h2>
      <h2>Your highest score: {scores}</h2>
      <h2>Your remaining moves:{moves}</h2>
      <h2>{endGame}</h2>
      <button className="button_restarting" onClick={endGame ? restart : pause}>
        {endGame ? "Restart " : "Pause"}
      </button>
    </div>
  );
};

export default WinLogic;
