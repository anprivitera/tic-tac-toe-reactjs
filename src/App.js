import { useState } from "react";
// see https://react.dev/reference/react/useState#usestate

function Square({value, onSquareClick}) { // the function Square takes "value" and "onSquareClick" as parameters
  return <button className="square" onClick={onSquareClick}>
    {value}
    </button>;
} // the function returns a HTML button element with the class name of Square, which when receving a click in the browser will activate the function "onSquareClick" (declared below). This button element wraps the variable "value".

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  // the first element in the array will be the current state of the board, the second ("setSquares") changes the value based on the function setSquares. Through array destructuring, we declare that squares (i.e., the initial state) is an array of 9 items, each one with the value of null.

  function handleClick(i) { // declaring handleClick function with argument i
    const nextSquares = squares.slice(); // nextSquares is now a shallow copy of the squares array
    nextSquares[i] = "X" // the position i of the nextSquares array is changed from null to the string "X"
    setSquares(nextSquares) // tells React to change the initial state of position 0 in the squares array to "X" through useState
  }

  return (
  <> 
  {/* Here we are creating three div elements called board-row. In each of the three board-rows we are adding three React elements generated from the function square to form the tic-tac-toe board. Each element takes one array position as value, and the function handleClick as onSquareClick. 
  
  Right now nothing changes because "i" is not connected with anything */}
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={handleClick} />
      <Square value={squares[1]} onSquareClick={handleClick} />
      <Square value={squares[2]} onSquareClick={handleClick} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={handleClick} />
      <Square value={squares[4]} onSquareClick={handleClick} />
      <Square value={squares[5]} onSquareClick={handleClick} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={handleClick} />
      <Square value={squares[7]} onSquareClick={handleClick} />
      <Square value={squares[8]} onSquareClick={handleClick} />
    </div>
  </>
  );
}