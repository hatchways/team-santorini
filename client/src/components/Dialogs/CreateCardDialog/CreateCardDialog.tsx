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
  // eslint-disable-next-line
  handleClick: (event: any) => void;
  handleClickOpen: () => void;
  handleClose: () => void;
  open: boolean;
}

const CreateCardDialog = ({ handleClick, handleClickOpen, handleClose, open }: Props): JSX.Element => {
  const classes = useStyles();
  const [title, setTitle] = React.useState('');

  // eslint-disable-next-line
  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleClick(title);
  };

  return (
    <div>
      <Button className={classes.addCardButton} variant="contained" color="primary" onClick={handleClickOpen}>
        Add a card
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <Box className={classes.dialog}>
            <IconButton className={classes.closeButton} aria-label="close" onClick={handleClose} type="button">
              <CloseIcon />
            </IconButton>
            <DialogTitle id="form-dialog-title">
              <Typography className={classes.title}>Create a new card</Typography>
            </DialogTitle>
            <DialogContent className={classes.content}>
              <TextField
                className={classes.textField}
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                id="outlined-basic"
                placeholder="Add Title"
                variant="outlined"
                // eslint-disable-next-line
                onInput={(e: any) => setTitle(e.target.value)}
              >
                <Typography className={classes.text}></Typography>
              </TextField>
            </DialogContent>
            <DialogActions className={classes.actions}>
              <Button type="submit" className={classes.createButton} color="primary" variant="contained">
                Create
              </Button>
            </DialogActions>
          </Box>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateCardDialog;
