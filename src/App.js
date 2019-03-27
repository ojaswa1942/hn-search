import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar'
import {Route, Switch} from 'react-router-dom';

const initialState = {
  user: {
    name: ''
  },
  isLoggedIn: false
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: ''
      },
      isLoggedIn: false
    }
  }

  updateUserInfo = (value) =>{
    this.setState({user: {
        name: value.name
      }
    });
  }
  updateLoginState = (value) =>{
    this.setState({isLoggedIn: value});
  }
  logOut = () =>{
    if(this.state.isLoggedIn){
      fetch('/api/logout')
      .then(res=>{
        if(res.redirected){
          this.setState(initialState);
          // window.location.reload();
          window.location.href='/';
        }
        throw(res.error)
      })
      .catch(console.log)
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar />

      </div>
    );
  }
}

export default App;
