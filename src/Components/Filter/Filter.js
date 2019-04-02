
import React, { Component } from 'react';
import './Filter.css';
import {Link} from 'react-router-dom'

class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	componentDidMount(){
	}
	updateType = (event) =>{
		let {searchSettings} = this.props;
  		window.history.pushState(null, null, `/query=${searchSettings.query}/sort=${searchSettings.sort}/page=${searchSettings.page}/dateRange=${searchSettings.dateRange}/type=${event.target.value}`);
		this.props.updateSearchType(event.target.value);

	}
	updateSort = (event) =>{
		let {searchSettings} = this.props;
  		window.history.pushState(null, null, `/query=${searchSettings.query}/sort=${event.target.value}/page=${searchSettings.page}/dateRange=${searchSettings.dateRange}/type=${searchSettings.type}`);
		this.props.updateSearchSort(event.target.value);
	}
	updateDateRange = (event) =>{
		let {searchSettings} = this.props;
  		window.history.pushState(null, null, `/query=${searchSettings.query}/sort=${searchSettings.sort}/page=${searchSettings.page}/dateRange=${event.target.value}/type=${searchSettings.type}`);
		this.props.updateSearchDateRange(event.target.value);
	}


	render() {
		let {number, timeTaken} = this.props.searchStats;
	    return (
	    	<header className='filter-parent'>
				<span className="filter-label">Search</span>
				<select onChange={this.updateType} id='typef' defaultValue="story" name="searchIn" className='selectFilter'>
					<option value="all">All</option>
					<option value="story">Stories</option>
					<option value="comment">Comments</option>
				</select>	
				<span className="filter-label">by</span>
				<select onChange={this.updateSort} id='sortf' defaultValue="byPopularity" name="searchBy" className='selectFilter'>
					<option value="byPopularity">Popularity</option>
					<option value="byDate">Date</option>
				</select>
				<span className="filter-label">for</span>
				<select onChange={this.updateDateRange} id='datef' defaultValue="all" name="searchFor" className='selectFilter'>
				    <option value="all">All time</option>
				    <option value="last24h">Last 24h</option>
				    <option value="pastWeek">Past Week</option>
				    <option value="pastMonth">Past Month</option>
				    <option value="pastYear">Past Year</option>
				</select>
				<span className='search-infos'>
					{(number || timeTaken)?
						`${number.toLocaleString('en')} results(${timeTaken} seconds)` : null
					}
				</span>
			</header>
	    );
	}
}

export default Filter;
