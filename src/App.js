import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar'
import Results from './Components/Results/Results'
import {Route, Switch} from 'react-router-dom';

const initialState = {
  user: {
    name: ''
  },
  searchSettings: {
    type: 'story',
    dateRange: null,
    sort: 'search',
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
  constructor(props) {
    super(props);
    this.state = initialState
  }
  componentDidMount(){

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
    return (
      <div className="App">
        <Navbar
          updateSearchSort={this.updateSearchSort}
          updateSearchType={this.updateSearchType}
          updateSearchDateRange={this.updateSearchDateRange}
          updateSearchQuery={this.updateSearchQuery}
          searchStats={this.state.searchRes}
        />
        <Route path={['/',"/hello"]} render={(props) => {
          return(
            <Results {...props} />
            )
          }}
        />
      </div>
    );
  }
}

export default App;
