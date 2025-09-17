import React from 'react';
import { SquareValue } from './Board';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        fontSize: '24px',
        border: '1px solid #000',
        backgroundColor: '#fff',
        cursor: 'pointer',
        color: '#000'
      }}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export { Square };