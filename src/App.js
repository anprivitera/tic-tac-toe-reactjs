import { useState } from "react";
// see https://react.dev/reference/react/useState#usestate

function Square({ value, onSquareClick }) {
  // the function Square takes "value" and "onSquareClick" as parameters
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
} // the function returns a HTML button element with the class name of Square, which when receving a click in the browser will activate the function "onSquareClick" (declared below). This button element wraps the variable "value".

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // declaring handleClick function with parameter i
    if (squares[i] || calculateWinner(squares)) {
      // If the item i in the array squares is true... (note: in node null == true returns false. is that the reason why this works?)
      return; // ...the function ends here.
    }
    const nextSquares = squares.slice(); // nextSquares is now a shallow copy of the squares array. The original array is not touched.
    //~~FABIO: In the current state of the code, I get "squares.slice is not a function..."~~ > I forgot to add {} in the function arguments. Is it because they are React elements?
    if (xIsNext) {
      // if xIsNext corresponds to the boolean true...
      nextSquares[i] = "X"; // ...the position i of the nextSquares array is changed from null to the string "X"
    } else {
      // if xIsNext does not correspond to the boolean true...
      nextSquares[i] = "O"; // ...the position i of the nextSquares array is changed from null to the string "O"
    }
    onPlay(nextSquares); // FABIO: the previous calls "setSquares" and "setXIsNext" are now being handled in the <Board /> component inside of the "Game" default function, so that we can simultaneously upodate the state of the board and keep track of changes. Am I getting it right?
  }

  const winner = calculateWinner(squares); // the result of the calculateWinner function is assigned to the constant winner (unless very specific conditions apply, the result is null) (FABIO: why const here it it is going to change? The app still runs even with winner declared with let)
  let status; // status is true
  if (winner) {
    // if winner is not null
    status = "Winner: " + winner; // return this string
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O"); // return this string
  }

  return (
    <>
      {/* Here we are creating three div elements called board-row. In each of the three board-rows we are adding three React elements generated from the function square to form the tic-tac-toe board. Each element takes one array position as value, and the function handleClick as onSquareClick. 
  
    On click, each square changes from null to X
    */}
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  //This is now the top level component in index.js
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[history.length - 1]; // the constant currentSquares is declared as the position 0 in the array inside the array history. FABIO: is that correct?
  function handlePlay(nextSquares) {
    setHistory([...history.slice(0, currentMove + 1), nextSquares]); //the function setHistory takes as arguments the enumeration of the array history and nextSquares (again, a shallow copy of the squares array). I suppose this function will handle the old states of the game as a series of arrays and the current state as also an array.
    // With the change in this commit, a shallow copy of the history array is created which starts from position 0 and goes up to currentMove + 1, excluding subsequent moves if "travelling back in time"
    setXIsNext(!xIsNext); //the function setXIsNext takes as an argument the opposite of xISNext?
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove); // the function setCurrentMove takes nextMove as a parameter
    setXIsNext(nextMove % 2 === 0); // FABIO: the function setXIsNext takes the remainder of nextMove divided by two IF it is equal and the same type of data as 0? Not too sure about this.
  }

  const moves = history.map((squares, move) => {
    // What is the purpose of the argument "squares" in this function?
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        {/* No more key error */}
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    //creating the HTML elements that show the game history.
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />{" "}
        {/*The board is still present here, hence the App keeps working*/}
      </div>
      <div className="game info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  // a function to decide the winner taking the squares element as a property.
  const lines = [
    // an array of arrays containing the positions on the board where all the possible win states in tic-tac-toe can occur.
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    // for eigtht times (i.e., the elements in the lines array)...
    const [a, b, c] = lines[i]; // ...the function will assign each item of the sub-array found in the position "i" of the "lines" array to "a", "b", "c" in the array declared as constant on the left... (FABIO: why are we declaring this element as a constant if it is going to change in each iteration of the loop? Is it because it is scoped in the block starting on line 66? Still, why not declaring it as a variable?)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // if the item a in the squares array is not null and the item a in the squares array is strictly equal to the item b in the array squares and the item a in the squares array is strictly equal to the item c in the squares array (in other words, if in the positions a b and c we have all Xs or Os)...
      return squares[a]; // return the symbol that is present in square A
    }
  }
  return null; // if none of the conditions above is fulfilled, the function returns null
}
