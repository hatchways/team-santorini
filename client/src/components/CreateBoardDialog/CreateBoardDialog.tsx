import React from 'react';
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

interface Props {
  createBoardOpen: boolean;
  handleCloseCreateBoard: (title: string) => void;
}

const CreateBoardDialog = ({ createBoardOpen, handleCloseCreateBoard }: Props): JSX.Element => {
  const classes = useStyles();
  const [text, setText] = React.useState<string>('');

  const handleClose = () => {
    handleCloseCreateBoard('');
  };
  const handleSubmit = () => {
    handleCloseCreateBoard(text);
  };
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <Dialog open={createBoardOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <Box className={classes.dialog}>
          <IconButton className={classes.closeButton} aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <DialogTitle id="form-dialog-title">
            <Typography className={classes.title}>Create new board</Typography>
          </DialogTitle>
          <DialogContent className={classes.content}>
            <TextField
              className={classes.textField}
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              id="outlined-basic"
              placeholder="Add Title"
              variant="outlined"
              onChange={onChangeText}
            >
              <Typography className={classes.text}></Typography>
            </TextField>
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

export default CreateBoardDialog;
