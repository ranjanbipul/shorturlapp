import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { withSnackbar } from 'notistack';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import {newRedirect} from '../store/actions';

class NewRedirect extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      url: "",
      process: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.newRedirect = this.newRedirect.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  newRedirect(){
    this.setState({process: true});
    this.props.newRedirect(this.state.url)
    .then((json)=>{
      this.props.enqueueSnackbar("Created Successfully",{variant:'success'});
      this.setState({process: false,url:""});
    })
    .catch((json)=>{
      if(json.errors!==undefined){
        Object.values(json.errors).forEach((val,key)=>this.props.enqueueSnackbar(val,{variant:'error'}));
      }
      else{
        this.props.enqueueSnackbar(json.message,{variant:'error'});
      }
      this.setState({process: false});
    });;
  }

  render(){
    const {classes} = this.props;
    return (
      <div className={classes.main}>
          <FormControl margin="normal" required style={{flex:4}}>
              <InputLabel htmlFor="url">Your Original URL</InputLabel>
              <Input id="url"
              value={this.state.url}
              onChange = {this.handleChange} 
              name="url" 
              variant="outlined"
              autoComplete="url" autoFocus />
            </FormControl>
              <Button
              type="button"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.newRedirect}
              disabled={this.state.process}
              style={{flex:1}}
            >
              Shorten URL
            </Button>
      </div>
    );
  }
}

NewRedirect.propTypes = {
  classes: PropTypes.object.isRequired,
  newRedirect: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const styles = theme => ({
  main: {
    display: 'flex',
    flexDirection: 'row'
  }
});


const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({newRedirect},dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(withStyles(styles)(NewRedirect)));