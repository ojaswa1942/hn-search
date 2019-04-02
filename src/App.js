import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar'
import Results from './Components/Results/Results'
import Login from './Components/Login/Login'
import {Route, Switch} from 'react-router-dom';
import Pagination from './Components/Pagination/Pagination'

const initialState = {
  user: {
    name: ''
  },
  searchSettings: {
    type: 'story',
    dateRange: 'all',
    sort: 'byPopularity',
    query: '',
    page: 0
  },
  isLoggedIn: false,
  searchRes: {
    results: [],
    number: 0,
    timeTaken: 0,
    totalPage: 0
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }
  componentDidMount(){

  }
  updateSearchSettings = (sort, type, dateRange, page, query) => {
    this.setState({
      searchSettings: {
        sort, type, dateRange, page, query
      }
    })
  }

  updateSearchQuery = (value) =>{
    this.setState({
      searchSettings: {
        ...this.state.searchSettings, 
        query: value
      }
    });
  }
  updateSearchPage = (value) =>{
    this.setState({
      searchSettings: {
        ...this.state.searchSettings, 
        page: value
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
  updateSearchStats = (number, time,page) =>{
    this.setState({
      searchRes: {
        ...this.state.searchRes, 
        number: number,
        timeTaken: time,
        totalPage: page
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
    let searchSettings = this.state.searchSettings;
    if(window.location.pathname==='/')
      window.location.href=(`/query=${searchSettings.query}/sort=${searchSettings.sort}/page=${searchSettings.page}/dateRange=${searchSettings.dateRange}/type=${searchSettings.type}`);
    return (
      <div className="App">
        <Navbar
          updateSearchSort={this.updateSearchSort}
          updateSearchType={this.updateSearchType}
          updateSearchDateRange={this.updateSearchDateRange}
          updateSearchQuery={this.updateSearchQuery}
          searchSettings={this.state.searchSettings}
          searchStats={this.state.searchRes}
          isLoggedIn={this.state.isLoggedIn}
        />
        <Route path="/query=:query?/sort=:sort/page=:page/dateRange=:dateRange/type=:type" render={(props) => {
         return(
          <Results {...props}
            searchSettings={this.state.searchSettings}
            updateSearchStats={this.updateSearchStats}
            updateSearchSettings={this.updateSearchSettings}
            initialPage={this.state.searchSettings.page}
            totalPages={this.state.searchRes.totalPage}
            updateSearchPage={this.updateSearchPage}
          />
         )
        }}
        />
        <Route path="/login" render={(props) => {
         return(
          <Login {...props}
            isLoggedIn={this.state.isLoggedIn}
          />
         )
        }} />
      </div>
    );
  }
}

export default App;
