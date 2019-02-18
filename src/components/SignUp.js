import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { withSnackbar } from 'notistack';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import {register} from '../store/actions';

class SignUp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      process: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  register(){
    this.setState({process: true});
    this.props.register(this.state.name,this.state.username,this.state.password)
    .then((json)=>{
      this.props.enqueueSnackbar("Successfully Registered",{variant:'success'});
      this.setState({process: false});
    })
    .catch((json)=>{
      if(json.errors!==undefined){
        Object.values(json.errors).forEach((val,key)=>this.props.enqueueSnackbar(val,{variant:'error'}))
      }else
        this.props.enqueueSnackbar(json.message,{variant:'error'});
      this.setState({process: false});
    });;
  }

  render(){
    const {classes} = this.props;
    return (
      <div className={classes.main}>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name"
              value={this.state.name}
              onChange = {this.handleChange} 
              name="name" 
              autoComplete="name" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username"
              value={this.state.username}
              onChange = {this.handleChange} 
              name="username" 
              autoComplete="username" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password"
               type="password" 
               id="password" 
               autoComplete="current-password" 
               value={this.state.password}
               onChange = {this.handleChange}
              />
            </FormControl>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.register}
              disabled={this.state.process}
            >
              Sign Up
            </Button>
          </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const styles = theme => ({
  main: {
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4
  },
  form: {
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({register},dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(withStyles(styles)(SignUp)));