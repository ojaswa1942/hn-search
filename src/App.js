import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar'
import {Route, Switch} from 'react-router-dom';

const initialState = {
  user: {
    name: ''
  },
  searchSettings: {
    type: '',
    dateRange: '',
    sort: '',
    query: ''
  },
  isLoggedIn: false,
  searchRes: {
    results: [],
    number: 0,
    timeTaken: 0
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  updateSearchQuery = (value) =>{
    this.setState({
      searchSettings: {
        ...this.state.searchSettings, 
        query: value
      }
    });
  }

  updateSearchDateRange = (value) =>{
    this.setState({
      searchSettings: {
        ...this.state.searchSettings, 
        dateRange: value
      }
    })
  }
  updateSearchType = (value) =>{
    this.setState({
      searchSettings: {
        ...this.state.searchSettings, 
        type: value
      }
    })
  }
  updateSearchSort = (value) =>{
    this.setState({
      searchSettings: {
        ...this.state.searchSettings, 
        sort: value
      }
    })
  }
  updateUserInfo = (value) =>{
    this.setState({user: {
        name: value.name
      }
    });
  }
  updateSearchStats = (number, time) =>{
    this.setState({
      searchRes: {
        ...this.state.searchRes, 
        number: number,
        timeTaken: time
      }
    })
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
    console.log(this.state);
    return (
      <div className="App">
        <Navbar
          updateSearchSort={this.updateSearchSort}
          updateSearchType={this.updateSearchType}
          updateSearchDateRange={this.updateSearchDateRange}
          updateSearchQuery={this.updateSearchQuery}
          searchStats={this.state.searchRes}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {this.state.searchSettings.query}
      </div>
    );
  }
}

export default App;
