import React from 'react';
import axios from 'axios';
import { 
  makeStyles, 
  TextField, 
  Button, 
  Snackbar, 
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import front_end_url from '../config';

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

const Signup = (props) => {
  const classes = useStyles();

  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [statusMessage, setStatusMesage] = React.useState('');

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'full-name':
        setFullName(e.target.value);
        break;
      case 'email-address':
        setEmailAddress(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'repeat-password':
        setRepeatPassword(e.target.value);
        break;
      default:
        break;
    }
  }

  const clickHandler = async (e) => {
    try {
      let result = await axios.post(`${front_end_url}/users/createUser`, {
        fullName: fullName,
        email: emailAddress,
        phone: phone,
        password: password,
      });
      
      setStatusMesage('Registration Successful, now you can Login!');
      setOpen(true);
    } catch(e) {
      setStatusMesage(e.response.data);
      setOpen(true);
    }
  }

  const handleClose = (e) => {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField id="full-name" label="Full Name" value={fullName} onChange={handleChange} />
        <TextField id="email-address" label="Email address" value={emailAddress} onChange={handleChange} />
        <TextField id="phone" label="Phone Number" value={phone} onChange={handleChange} />
        <TextField id="password" label="Password" type="password" value={password} onChange={handleChange} />
        <TextField id="repeat-password" label="Repeat Password" type="password" value={repeatPassword} onChange={handleChange} />
        <Button variant="contained" onClick={clickHandler}>Sign Up</Button>
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

export default Signup;