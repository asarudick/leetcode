import React from 'react';
import { Board } from './Board';


const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Tic-Tac-Toe</h1>
      <Board />
    </div>
  );
};

export { App };