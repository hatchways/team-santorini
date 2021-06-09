import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import logo from '../../Images/logo.png';
import useStyles from './useStyles';
import CreateBoardDialog from '../CreateBoardDialog/CreateBoardDialog';
import { useAuth } from '../../context/useAuthContext';

const DashboardHeader = (): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [createBoardOpen, setCreateBoardOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const { logout } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickCreateBoard = () => {
    setCreateBoardOpen(true);
  };

  const handleCloseCreateBoard = () => {
    setCreateBoardOpen(false);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <Box className={classes.header}>
      <Box flexGrow={1}>
        <img src={logo} alt="Logo" />
      </Box>

      <Box flexGrow={1} justifyContent={'space-between'}>
        <Button className={classes.dashboardButton} startIcon={<DashboardOutlinedIcon />}>
          Dashboard
        </Button>
        <Button className={classes.calendarButton} startIcon={<CalendarTodayOutlinedIcon />}>
          Calendar
        </Button>
      </Box>

      <Box>
        <Button
          className={classes.createBoardButton}
          onClick={handleClickCreateBoard}
          startIcon={<AddIcon />}
          color="primary"
          variant="contained"
        >
          Create board
        </Button>
        <CreateBoardDialog createBoardOpen={createBoardOpen} handleCloseCreateBoard={handleCloseCreateBoard} />
      </Box>

      <Box>
        <Avatar className={classes.avatar} alt="avatar" onClick={handleClick}>
          S
        </Avatar>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          <MenuItem onClick={handleClose}>Go to profile</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
