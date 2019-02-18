import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { logout} from '../store/actions'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button, LinearProgress } from '@material-ui/core';

class Header extends React.Component{
  
  render(){
    const { classes,user,transfer } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              ShortURL
            </Typography>
            {user && <Button color="inherit" onClick={this.props.logout}>Logout</Button>}
          </Toolbar>
          {transfer && <LinearProgress color="secondary" style={{marginTop:-5}} />}
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  transfer: PropTypes.bool.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  }
});

const mapStateToProps = state => ({
  user: state.app.user,
  transfer: state.app.transfer
})

const mapDispatchToProps = dispatch => bindActionCreators({logout},dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles,{ withTheme: true })(Header));
