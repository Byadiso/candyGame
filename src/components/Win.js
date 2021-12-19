const WinLogic = ({ scores, moves, endGame }) => {
  return (
    <div className="score-board">
      <h2>Congrat You won! </h2>
      <h2>Your score: {scores}</h2>
      <h2>{moves}</h2>
      <h2>{endGame}</h2>
    </div>
  );
};

export default WinLogic;
