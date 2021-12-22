import { useEffect, useState } from "react";
import BlueCandy from "./images/blue-candy.png";
import GreenCandy from "./images/green-candy.png";
import OrangeCandy from "./images/orange-candy.png";
import PurpleCandy from "./images/purple-candy.png";
import RedCandy from "./images/red-candy.png";
import blank from "./images/blank.png";
import YellowCandy from "./images/yellow-candy.png";
import ScoreBoard from "./components/ScoreBoard";
import WinLogic from "./components/Win";

const width = 8;
const candyColors = [
  BlueCandy,
  GreenCandy,
  OrangeCandy,
  PurpleCandy,
  RedCandy,
  YellowCandy,
  blank,
];

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [moves, setMoves] = useState(10);
  const [gameOver, SetGameOver] = useState(false);

  /// check for column
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );

        return true;
      }
    }
  };

  //checking for row
  const checkForRowsOfFour = () => {
    for (let i = 0; i < 63; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 61, 62, 63,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );

        //update scores
        setScoreDisplay((score) => score + 4);

        return true;
      }
    }
  };
  // checking for raw of three
  const checkForRowsOfThree = () => {
    for (let i = 0; i < 63; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );

        //update scores
        setScoreDisplay((score) => score + 3);
        return true;
      }
    }
  };

  //moveinto square
  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === blank) {
        const randomNUmber = Math.floor(candyColors.length * Math.random());
        currentColorArrangement[i] = candyColors[randomNUmber];
      }

      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");
    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    const validMoves = [
      squareBeingReplacedId - 1,
      squareBeingReplacedId + 1,
      squareBeingReplacedId,
      squareBeingReplacedId - width,
      squareBeingReplacedId + width,
    ];

    const validMove = validMoves.includes(squareBeingDraggedId, 0);
    // const validMove = validMoves.includes(squareBeingDraggedId);
    console.log(validMoves.includes(squareBeingDraggedId, 0));
    console.log(validMove);
    console.log(squareBeingDraggedId + " being draggd");
    console.log(squareBeingReplacedId + " being replaced");

    const isRowOfFour = checkForRowsOfFour();
    const isColumnOfFour = checkForColumnOfFour();
    const isRowOfThree = checkForRowsOfThree();
    const isColumnfThree = checkForColumnOfThree();

    if (
      squareBeingReplacedId &&
      squareBeingDraggedId &&
      validMove &&
      (isColumnOfFour || isColumnfThree || isRowOfFour || isRowOfThree)
    ) {
      setSquareBeingReplaced(null);
      setSquareBeingDragged(null);
      console.log("valid move"); //changed this to being gradded to check the effect
    } else {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
      console.log("not a vaid move");
    }

    //check for moves and reduce 1
    if (
      squareBeingDraggedId &&
      squareBeingReplacedId &&
      validMove &&
      (isColumnOfFour || isColumnfThree || isRowOfFour || isRowOfThree)
    ) {
      if (moves === 0) {
        return;
      } else {
        setMoves(moves - 1);
      }
    }
  };

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(candyColors.length * Math.random())];

      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  //checking for gameover
  let isGameOver = moves === 0;
  let GameOverChek = () => {
    if (isGameOver) {
      SetGameOver(true);
      setHighScore(scoreDisplay);
      return;
    }
  };
  // pause and restart login

  const restart = () => {
    console.log("game restarted");
  };
  const pause = () => {
    console.log("game paused");
  };
  //render my board when the screen renders

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowsOfFour();
      checkForColumnOfThree();
      checkForRowsOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
      GameOverChek();
      setHighScore(highScore);
    }, 100);
    // we need to return clearInterval in order to stope check game logic
    return () => clearInterval(timer);
  }, [
    checkForRowsOfFour,
    checkForColumnOfFour,
    checkForColumnOfThree,
    checkForRowsOfThree,
    moveIntoSquareBelow,
    currentColorArrangement,
    highScore,
    scoreDisplay,
    GameOverChek,
  ]);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            alt={candyColor}
            src={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <div className="boardScore">
        <ScoreBoard score={scoreDisplay} />
        <WinLogic
          scores={scoreDisplay}
          moves={moves}
          endGame={isGameOver}
          restart={restart}
          pause={pause}
        />
        <p>{gameOver}</p>
      </div>
    </div>
  );
};

export default App;
