import { useState } from "react";

function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>
    {value}
    </button>;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  // the first element in the array is the current state of the board, the second ("setSquares") changes the value based on the function setSquares.

  function handleClick() { // declaring handleClick function
    const nextSquares = squares.slice(); // nextSquares is now a shallow copy of the squares array
    nextSquares[0] = "X" // the position 0 of the nextSquares array is now string "X"
    setSquares(nextSquares) // tells React to rerender the board. (??)
  }

  return (
  <>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={handleClick} />
      <Square value={squares[1]} />
      <Square value={squares[2]} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} />
      <Square value={squares[4]} />
      <Square value={squares[5]} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} />
      <Square value={squares[7]} />
      <Square value={squares[8]} />
    </div>
  </>
  );
}