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

function Board() {
  // Removed export devault from the board. this is not the top level component anymore in in index.js
  const [xIsNext, setXIsNext] = useState(true); // the first element in the array will be the current state, the second alter the state. The initial state is the boolean true.
  const [squares, setSquares] = useState(Array(9).fill(null));
  // the first element in the array will be the current state of the board, the second ("setSquares") changes the value based on the function setSquares. Through array destructuring, we declare that squares (i.e., the initial state) is an array of 9 items, each one with the value of null.

  function handleClick(i) {
    // declaring handleClick function with parameter i
    if (squares[i] || calculateWinner(squares)) {
      // If the item i in the array squares is true... (note: in node null == true returns false. is that the reason why this works?)
      return; // ...the function ends here.
    }
    const nextSquares = squares.slice(); // nextSquares is now a shallow copy of the squares array. The original array is not touched.
    if (xIsNext) {
      // if xIsNext corresponds to the boolean true...
      nextSquares[i] = "X"; // ...the position i of the nextSquares array is changed from null to the string "X"
    } else {
      // if xIsNext does not correspond to the boolean true...
      nextSquares[i] = "O"; // ...the position i of the nextSquares array is changed from null to the string "O"
    }
    setSquares(nextSquares); // tells React to change the initial state of position 0 in the squares array to "X" through useState
    setXIsNext(!xIsNext); // tells React to change the initial state of xIsNext from true to false.
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
  //creating the HTML elements that show the game history. This is now the top level component in index.js
  const [isXNext, setXIsNext] = useState(true); //the first element in the left array will be the current state, the second alter the state. The initial state is the boolean true. I suppose this will keep track of each player's history.
  const [history, setHistory] = useState([Array(9).fill(null)]); // the first element in the left array will be the current state, the second alter the state. The initial state is a single-item array, in which that single item is an array of 9 items filled as null. This will keep track of the positions on the board
  const currentSquares = history[history.length - 1]; // the constant currentSquares is declared as the position 0 in the array inside the array history. FABIO: is that correct?
  return (
    <div className="game">
      <div className="game-board">
        <Board />{" "}
        {/*The board is still present here, hence the App keeps working*/}
      </div>
      <div className="game info">
        <ol>{/*TODO*/}</ol>
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
