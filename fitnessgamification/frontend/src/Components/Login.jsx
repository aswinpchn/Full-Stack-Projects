import React from 'react';
import { 
  makeStyles, 
  TextField, 
  Button, 
  Snackbar, 
  IconButton
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import Cookies from 'universal-cookie';

import front_end_url from '../config';
import { UserContext } from '../UserContext';

const cookies = new Cookies();


const useStyles = makeStyles((theme) => ({
  form: {
    padding: '1rem',
    display: 'flex',
    width: '400px',
    height: '400px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid black',
    backgroundColor: 'white',
    borderRadius: '2px',
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '85vh',
    backgroundColor: '#72A0C1',
  }, 
}));

const Login = (props) => {
  const classes = useStyles();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [statusMessage, setStatusMesage] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);
  const { user, setUser }  = React.useContext(UserContext);  // This is how we can access user, and setUser from UserContext.

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'email-address':
        setEmailAddress(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  }

  const clickHandler = async (e) => {
    try {
      let data = {
        email: emailAddress,
        password: password,
      };
      let result = await axios.post(`${front_end_url}/users/login`, data);
      
      cookies.set('userDetails', JSON.stringify(data), { path: '/' });
      setStatusMesage('Login successful!');
      setOpen(true);
      setRedirect(true);
      setUser({
        isLoggedIn: true,
        user: {
          ...result.data
        },
      });
    } catch(e) {
      setStatusMesage(e.response && e.response.data);
      setOpen(true);
    }
  }

  const handleClose = (e) => {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      {redirect && <Redirect to='/dashboard' />}
      <form className={classes.form} noValidate autoComplete="off">
        <TextField id="email-address" label="Email address" value={emailAddress} onChange={handleChange} />
        <TextField id="password" label="Password" type="password" value={password} onChange={handleChange} />
        <Button variant="contained" onClick={clickHandler}>Login</Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={statusMessage}
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </form>
    </div>
  );
}

export default Login;