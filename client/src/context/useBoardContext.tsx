import { useState, useContext, createContext, FunctionComponent } from 'react';
import { Board, BoardTitlePair, BoardTitleApiData, UpdateBoardApiData } from '../interface/Board';
import { User } from '../interface/User';
import { getBoardTitles, getBoard, updateBoard } from '../helpers/APICalls/boardAPI';
import { useSnackBar } from '../context/useSnackbarContext';

interface IBoardContext {
  currentBoard: Board;
  setBoard: (data: Board) => void;
  publishBoard: () => void;
  fetchBoard: (id: string) => void;
  boardTitles: BoardTitlePair[];
  fetchBoardTitles: (user: User, force: boolean) => void;
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
  const [boardTitles, setBoardNames] = useState<BoardTitlePair[]>([]);
  const { updateSnackBarMessage } = useSnackBar();

  const setBoard = (data: Board) => {
    setCurrentBoard(data);
  };

  const publishBoard = async () => {
    const data: UpdateBoardApiData = await updateBoard(currentBoard);
    if (data.success) setCurrentBoard(data.success);
    else updateSnackBarMessage(data.error ? data.error.message : 'An unknown error occurred');
  };

  const fetchBoard = async (id: string) => {
    const data: UpdateBoardApiData = await getBoard(id);
    if (data.success) setCurrentBoard(data.success);
    else throw new Error(data.error ? data.error.message : 'An unknown error occurred');
  };

  const fetchBoardTitles = async (user: User, force = false) => {
    if (!force && boardTitles.length > 0) return;
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
