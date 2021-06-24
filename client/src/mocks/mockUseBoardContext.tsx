import { useState, FunctionComponent } from 'react';
import { BoardContext } from '../context/useBoardContext';
import { Board } from '../interface/Board';
import mockBoard from './mockBoard';

const MockUseBoardProvider: FunctionComponent = ({ children }) => {
  const [board, setBoard] = useState<Board>(mockBoard);

  return (
    <BoardContext.Provider
      value={{
        currentBoard: board,
        setBoard: setBoard,
        publishBoard: () => null,
        fetchBoard: () => null,
        boardTitles: [{ id: board._id, title: board.title }],
        fetchBoardTitles: () => null,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default MockUseBoardProvider;
