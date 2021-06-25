import { Column } from './Column';

export interface Board {
  _id: string;
  title: string;
  columns: Column[];
}

export interface UpdateBoardApiData {
  success?: Board;
  error?: { message: string };
}

export interface BoardTitlePair {
  id: string;
  title: string;
}

export interface BoardTitleApiData {
  success?: BoardTitlePair[];
  error?: { message: string };
}
