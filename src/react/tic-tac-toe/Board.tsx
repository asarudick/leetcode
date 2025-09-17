import React, { useCallback, useEffect, useState } from 'react';
import { Square } from './Square';

export enum SquareValue {
  Empty = "",
  X = "X",
  O = "O"
}

interface BoardProps {}

const Board: React.FC<BoardProps> = () => {
  const [squares, setSquares] = useState<SquareValue[]>(Array.from({ length: 9 }, () => SquareValue.Empty));
  const [player, setPlayer] = useState<number>(0);
  const [winner, setWinner] = useState<number | null>(null);
  
  const resetBoard = useCallback(() => {
    setWinner(null);
    setPlayer(0);
    setSquares(Array.from({length: 9}, i => SquareValue.Empty));
  }, [player, squares]);

  function hasWinner(squares: SquareValue[]) {
    const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];

    const cols = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];

    const diag = [
      [0, 4, 8],
      [6, 4, 2]
    ];

    return [...rows, ...cols, ...diag].some(a => a.every(i => squares[i] === SquareValue.X) || a.every(i => squares[i] === SquareValue.O));
  }


  const onSquareClick = useCallback(
    (square: SquareValue, index: number) => {
      if (square !== SquareValue.Empty) return;

      const newSquares = [...squares];
      newSquares.splice(index, 1, player === 0 ? SquareValue.X : SquareValue.O);
      setSquares(newSquares);
      if (hasWinner(newSquares)) setWinner(player);
      setPlayer((player + 1) % 2);
    },
    [player, squares],
  );

  return (
    <>
      <div>{winner !== null && `Player ${winner + 1} has won!`}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '400px' }}>
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => onSquareClick(value, index)}
            />
          ))}
      </div>
      <button onClick={resetBoard} name="Reset">Reset</button>
    </>
  );
};

export { Board };