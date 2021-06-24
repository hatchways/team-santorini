import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useBoard } from '../../context/useBoardContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import DashboardAppBar from '../../components/DashboardAppBar/DashboardAppBar';
import BoardUI from '../../components/BoardUI/BoardUI';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Box from '@material-ui/core/Box';
import CreateColumnDialog from '../../components/CreateColumnDialog/CreateColumnDialog';
import initialData from '../../components/BoardUI/initial-data';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const [createColumnOpen, setCreateColumnOpen] = useState(false);
  const { currentBoard, fetchBoard } = useBoard();

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const { updateSnackBarMessage } = useSnackBar();

  const history = useHistory();
  const location = useLocation();

  const handleClickCreateColumn = () => {
    setCreateColumnOpen(true);
  };

  const handleCloseCreateColumn = () => {
    setCreateColumnOpen(false);
  };

  const loadDefaultBoard = async () => {
    try {
      if (loggedInUser && loggedInUser.boards && loggedInUser.boards.length > 0) {
        await fetchBoard(loggedInUser.boards[0]);
        history.push({
          search: `?board=${loggedInUser.boards[0]}`,
        });
      }
    } catch (e) {
      updateSnackBarMessage(e.message);
    }
  };

  const loadNewBoard = async (newid: string) => {
    try {
      await fetchBoard(newid);
    } catch (e) {
      updateSnackBarMessage(e.message);
    }
  };

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  const query = new URLSearchParams(location.search).get('board');

  if (!query) {
    loadDefaultBoard();
    return <CircularProgress />;
  } else if (currentBoard._id != query) {
    loadNewBoard(query);
  }

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />

      {console.log('loggedInUser board data', loggedInUser.board)}
      <Grid item xs={12}>
        <DashboardHeader loggedInUser={loggedInUser} />
        <DashboardAppBar />
      </Grid>

      <Box className={classes.board} display={'flex'} justifyContent={'space-between'}>
        <Grid item>
          <IconButton className={classes.addColumnButton} onClick={handleClickCreateColumn}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
          <CreateColumnDialog createColumnOpen={createColumnOpen} handleCloseCreateColumn={handleCloseCreateColumn} />
        </Grid>

        <Grid item xs={12}>
          <BoardUI boardData={initialData} />
          {console.log('board data', initialData)}
        </Grid>

        <Grid item>
          <IconButton className={classes.addColumnButton} onClick={handleClickCreateColumn}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Box>
    </Grid>
  );
}
