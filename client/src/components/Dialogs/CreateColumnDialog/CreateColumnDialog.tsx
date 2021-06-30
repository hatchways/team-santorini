import { useState } from 'react';
import useStyles from './useStyles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useBoard } from '../../../context/useBoardContext';

interface Props {
  createColumnOpen: boolean;
  handleCloseCreateColumn: () => void;
}

const CreateColumnDialog = ({ createColumnOpen, handleCloseCreateColumn }: Props): JSX.Element => {
  const classes = useStyles();
  const { currentBoard, setBoard } = useBoard();
  const [title, setTitle] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const columnId = generateColumnId();
    const newColumn = { cards: [], _id: columnId, title: title, __v: 0 };
    const newBoard = {
      ...currentBoard,
      columns: currentBoard.columns.concat(newColumn),
    };
    setBoard(newBoard);
    handleCloseCreateColumn();
  };

  const handleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const generateColumnId = () => {
    const columnsLength = currentBoard.columns.length;
    const columnIds = currentBoard.columns.map((column) => column._id);
    let columnId = columnsLength;
    while (columnIds.includes('column-' + columnId)) {
      columnId += 1;
    }
    return 'column-' + columnId;
  };

  return (
    <div>
      <Dialog open={createColumnOpen} onClose={handleCloseCreateColumn} aria-labelledby="form-dialog-title">
        <Box className={classes.dialog}>
          <IconButton className={classes.closeButton} aria-label="close" onClick={handleCloseCreateColumn}>
            <CloseIcon />
          </IconButton>
          <DialogTitle id="form-dialog-title">
            <Typography className={classes.title}>Create a new column</Typography>
          </DialogTitle>
          <DialogContent className={classes.content}>
            <form onSubmit={handleSubmit}>
              <TextField
                className={classes.textField}
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                id="outlined-basic"
                placeholder="Add Title"
                variant="outlined"
                onChange={handleChange}
              >
                <Typography className={classes.text}></Typography>
              </TextField>
            </form>
          </DialogContent>
          <DialogActions className={classes.actions}>
            <Button className={classes.createButton} onClick={handleSubmit} color="primary" variant="contained">
              Create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default CreateColumnDialog;
