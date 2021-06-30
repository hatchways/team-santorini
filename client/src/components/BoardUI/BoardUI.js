/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Board from './Board';
import { useBoard } from '../../context/useBoardContext';

export default function BoardUI() {
  const { currentBoard } = useBoard();
  const generatedBoard = generateBoard(currentBoard);
  return <Board boardData={generatedBoard} />;
}

function generateBoard(board) {
  let generatedBoard = { cards: {}, columns: {}, columnOrder: [] };
  for (const column of board.columns) {
    generatedBoard.columns[column._id] = {
      id: column._id,
      title: column.title,
      cardIds: column.cards.map((card) => card._id),
    };
    generatedBoard.columnOrder.push(column._id);
    for (const card of column.cards) {
      generatedBoard.cards[card._id] = { id: card._id, title: card.title };
    }
  }
  return generatedBoard;
}
