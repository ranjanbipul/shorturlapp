import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Redirects from './Redirects';
import NewRedirect from './NewRedirect';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: "100%",
    maxWidth: 900,
    // flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Dashboard extends React.Component {
  
  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
          <Typography component="div">
            <NewRedirect />
            </Typography>
          <Typography variant="h5" gutterBottom component="h3">
            Your Short URLS
          </Typography>
          <Redirects />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
