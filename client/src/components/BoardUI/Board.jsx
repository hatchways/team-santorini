import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import useStyles from './useStyles';

// eslint-disable-next-line
const Board = ({ boardData }) => {
  const classes = useStyles();
  const [data, setData] = useState(boardData);
  const [cardTitle, setCardTitle] = useState('');

  const handleCardSubmit = (e) => {
    e.preventDefault();
    const totalCardsLength = Object.keys(data.cards).length;
    const columnId = e.target[0].id;
    const newCardId = `card-${totalCardsLength + 1}`;
    const newCard = { id: newCardId, title: cardTitle };
    const newData = {
      ...data,
      cards: {
        ...data.cards,
        [newCardId]: newCard,
      },
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          cardIds: data.columns[columnId].cardIds.concat(newCardId),
        },
      },
    };
    setData(newData);
    e.target[0].value = '';
  };

  const handleCardInput = (e) => {
    setCardTitle(e.target.value);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newBoard = {
        ...data,
        columnOrder: newColumnOrder,
      };

      setData(newBoard);
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newCardIds = Array.from(startColumn.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        cardIds: newCardIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
      return;
    }

    const startCardIds = Array.from(startColumn.cardIds);
    startCardIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(finishColumn.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      cardIds: finishCardIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };

    setData(newData);
    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={classes.boardContainer}>
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              const cards = column.cardIds.map((cardId) => data.cards[cardId]);
              return (
                <Column
                  key={column.id}
                  column={column}
                  cards={cards}
                  index={index}
                  handleSubmit={handleCardSubmit}
                  handleInput={handleCardInput}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
