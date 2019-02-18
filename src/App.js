import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { SnackbarProvider} from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';

// App Component import
import './App.css';
import Account from './components/Account';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <SnackbarProvider maxSnack={3}>
        <React.Fragment>
          <CssBaseline />
          <Header />
          <div className="Main">
            {!this.props.user && <Account />}
            {this.props.user && <Dashboard />}
          </div>
        </React.Fragment>
      </SnackbarProvider>
    );
  }
}


const mapStateToProps = state => ({
  user: state.app.user
})

const mapDispatchToProps = dispatch => bindActionCreators({},dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);