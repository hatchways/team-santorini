import { useState, useContext, createContext, FunctionComponent } from 'react';
import { Board, BoardTitleApiData, UpdateBoardApiData } from '../interface/Board';
import { User } from '../interface/User';
import { getBoardTitles, getBoard } from '../helpers/APICalls/boardAPI';

interface IBoardContext {
  currentBoard: Board;
  setBoard: (data: Board) => void;
  publishBoard: () => void;
  fetchBoard: (id: string) => void;
  boardTitles: string[];
  fetchBoardTitles: (user: User) => void;
}

export const BoardContext = createContext<IBoardContext>({
  currentBoard: { _id: '', title: '', columns: [] },
  setBoard: () => null,
  publishBoard: () => null,
  fetchBoard: () => null,
  boardTitles: [],
  fetchBoardTitles: () => null,
});

export const BoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [currentBoard, setCurrentBoard] = useState<Board>({ _id: '', title: '', columns: [] });
  const [boardTitles, setBoardNames] = useState<string[]>([]);

  const setBoard = (data: Board) => {
    setCurrentBoard(data);
  };

  const publishBoard = () => {
    console.log(currentBoard);
  };

  const fetchBoard = async (id: string) => {
    const data: UpdateBoardApiData = await getBoard(id);
    if (data.success) setCurrentBoard(data.success);
    else throw new Error(data.error ? data.error.message : 'An unknown error occurred');
  };

  const fetchBoardTitles = async (user: User) => {
    if (boardTitles.length > 0) return;
    const data: BoardTitleApiData = await getBoardTitles(user);
    if (data.success) setBoardNames(data.success);
    else throw new Error(data.error ? data.error.message : 'An unknown error occurred');
  };

  return (
    <BoardContext.Provider value={{ currentBoard, setBoard, publishBoard, fetchBoard, boardTitles, fetchBoardTitles }}>
      {children}
    </BoardContext.Provider>
  );
};

export function useBoard(): IBoardContext {
  return useContext(BoardContext);
}
