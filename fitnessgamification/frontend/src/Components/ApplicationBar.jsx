import React, { useContext } from 'react';
import {
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Button,
  makeStyles,
  Menu, 
  MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Cookies from 'universal-cookie';

import { UserContext } from '../UserContext';

let cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    justifyContent: 'space-around',
  },
  title: {
    flexGrow: 1,
  },
  container: {
    height: '9vh',
    width: '100%',
  }
}));

const ApplicationBar = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, setUser } = useContext(UserContext);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    cookies.remove('userDetails', { path: '/' });
    setUser({
      isLoggedIn: false,
      user: {}
    });
  };

  return (
    <div className={classes.container}>
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Fitness Gamification
          </Typography>
          {
            (user && user.isLoggedIn) ?
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {`Hi ${user.user && user.user.fullName} !`}
              </Button>
            : <Button color="inherit">Login</Button>
          }
        </Toolbar>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ApplicationBar;