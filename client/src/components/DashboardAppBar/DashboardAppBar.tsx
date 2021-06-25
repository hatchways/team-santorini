import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import useStyles from './useStyles';
import { useBoard } from '../../context/useBoardContext';
import { Link } from 'react-router-dom';

const DashboardAppBar = (): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { currentBoard, boardTitles } = useBoard();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.boardTitle}>{currentBoard.title}</Typography>

        <IconButton onClick={handleClick}>
          <MenuIcon className={classes.menuIcon} />
        </IconButton>
        <Drawer anchor="right" open={open} onClose={handleCloseMenu}>
          <List>
            {boardTitles.map(({ id, title }) => (
              <ListItem button key={id} component={Link} to={`?board=${id}`} onClick={handleCloseMenu}>
                <ListItemText primary={title} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardAppBar;
