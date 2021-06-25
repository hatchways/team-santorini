import Card from './Card';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import useStyles from './useStyles';
import TextField from '@material-ui/core/TextField';

// eslint-disable-next-line
const Column = ({ column, cards, index, handleSubmit, handleInput }) => {
  const classes = useStyles();

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef} className={classes.columnContainer}>
          <div {...provided.dragHandleProps} className={classes.columnTitle}>
            {column.title}
          </div>
          <Droppable droppableId={column.id} type="card">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={snapshot.isDraggingOver ? classes.cardListDraggingOver : classes.cardList}
              >
                {cards.map((card, index) => (
                  <Card key={card.id} card={card} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <form onSubmit={handleSubmit}>
            <TextField
              id={column.id}
              className={classes.addCardField}
              placeholder="Add a card..."
              InputProps={{ disableUnderline: true }}
              onInput={handleInput}
            />
          </form>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
