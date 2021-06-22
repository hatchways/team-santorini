import { Draggable } from 'react-beautiful-dnd';
import useStyles from './useStyles';

// const Container = ({ children }) => <div className='task-container'>{children}</div>

// eslint-disable-next-line
const Task = ({ task, index }) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={snapshot.isDragging ? classes.taskContainerDrag : classes.taskContainer}
          >
            {task.title}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
