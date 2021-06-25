import { Draggable } from 'react-beautiful-dnd';
import useStyles from './useStyles';

// eslint-disable-next-line
const Card = ({ card, index }) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={snapshot.isDragging ? classes.cardContainerDrag : classes.cardContainer}
          >
            {card.title}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
