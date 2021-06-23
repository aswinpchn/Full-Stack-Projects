import React from 'react';
import { Tabs, Tab, makeStyles } from '@material-ui/core';
import TabPanel from './TabPanel';
import Signup from './Signup';
import Login from './Login';

const useStyles = makeStyles((theme) => ({
}));

const OnBoarding = (props) => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div className={classes.tabs}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Signup" />
        <Tab label="Login" />
      </Tabs>
      <TabPanel value={value} index={0} >
        <Signup />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Login />
      </TabPanel>
    </div>
  );
};

export default OnBoarding;