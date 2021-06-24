import { UpdateBoardApiData, BoardTitleApiData } from '../../interface/Board';
import { User } from '../../interface/User';
import { FetchOptions } from '../../interface/FetchOptions';

const getBoard = async (id: string): Promise<UpdateBoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/board?id=${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

const newBoard = async (user: User, title: string): Promise<UpdateBoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: user.id, title }),
    credentials: 'include',
  };
  return await fetch(`/board/create`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

const getBoardTitles = async (user: User): Promise<BoardTitleApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/board/title?id=${user.id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export { getBoard, newBoard, getBoardTitles };
