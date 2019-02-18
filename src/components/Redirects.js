import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableHead, TableRow,Paper, CircularProgress} from '@material-ui/core';

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import {fetchRedirectList} from '../store/actions'

const styles = {
  root: {
    // width: '100%',
    // overflowX: 'auto',
  },
  table: {
    // minWidth: 700,
  },
};

class Redirects extends React.Component{

  constructor(props){
    super(props);
    this.state={
      processing:true
    }
  }

  componentDidMount(){
    this.props.fetchRedirectList().then(json=>{
      this.setState({processing:false});
    }).catch(json=>{

    });
  }

  render(){
    const {classes,redirects} = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Original Url</TableCell>
              <TableCell>Short Url</TableCell>
              <TableCell align="right">Hits</TableCell>
              <TableCell align="right">Created At</TableCell>
            </TableRow>
          </TableHead>
            {this.state.processing ? 
            <TableBody></TableBody>
            :
            <TableBody>
            {redirects.map(n => (
              <TableRow key={n._id}>
                <TableCell component="th" scope="row">
                  {n.originalUrl}
                </TableCell>
                <TableCell>
                  <a href={"http://localhost:5000/"+n.shortId} target="_blank" rel="noopener noreferrer">
                  http://localhost:5000/{n.shortId}</a>
                </TableCell>
                <TableCell align="right">{n.hits}</TableCell>
                <TableCell align="right">{n.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>}
        </Table>
        {this.state.processing && <CircularProgress className={classes.progress} size={30} />}
      </Paper>
    );
  }
}

Redirects.propTypes = {
  classes: PropTypes.object.isRequired,
  redirects: PropTypes.array.isRequired
};

const getRedirectList = (state) => {
    return Object.values(state.redirects.byIds).filter(redirect=>state.redirects.allIds.indexOf(redirect._id)!==-1);
}

const mapStateToProps = state => ({
  redirects: getRedirectList(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({fetchRedirectList},dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Redirects));
