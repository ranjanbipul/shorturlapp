import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import {Tab,Tabs, AppBar, Paper} from '@material-ui/core';
import SignIn from './SignIn';
import SignUp from './SignUp';

const styles =  (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 10,
  },
});

function Account(props) {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <div className={props.classes.root}>
    <Paper className={props.classes.paper}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant = "fullWidth"
        >
          <Tab label="Sign Up" />
          <Tab label="Sign In" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis='x'
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <SignUp />
        <SignIn />
      </SwipeableViews>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(Account);