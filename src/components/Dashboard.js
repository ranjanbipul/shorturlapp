import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SimpleTable from './Redirects';
import NewRedirect from './NewRedirect';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  tableContainer: {
    // minHeight: 320,
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
          <Typography variant="h4" gutterBottom component="h2">
            Your Short URLS
          </Typography>
          <div className={classes.tableContainer}>
            <SimpleTable />
          </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
