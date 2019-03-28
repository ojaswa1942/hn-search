
import React, { Component } from 'react';
import './Filter.css';
import {Link} from 'react-router-dom'

class Filter extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount(){
	}
	updateType = (event) =>{
		this.props.updateSearchType(event.target.value);
	}
	updateSort = (event) =>{
		this.props.updateSearchSort(event.target.value);
	}
	updateDateRange = (event) =>{
		this.props.updateSearchDateRange(event.target.value);
	}
	getLastWeek = () => {
	  const today = new Date();
	  const last = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
	  return (last.getTime()/1000);
	}
	getLastMonth = () => {
	  const today = new Date();
	  const last = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
	  return (last.getTime()/1000);
	}
	getLast24h = () => {
	  const today = new Date();
	  const last = new Date(today.getFullYear(), today.getMonth(), today.getDate()-1);
	  return (last.getTime()/1000);
	}
	getLastYear = () => {
	  const today = new Date();
	  const last = new Date(today.getFullYear()-1, today.getMonth(), today.getDate());
	  return (last.getTime()/1000);
	}

	render() {
		let lastWeek = this.getLastWeek();
		let lastMonth = this.getLastMonth();
		let last24h = this.getLast24h();
		let lastYear = this.getLastYear();
		let {number, timeTaken} = this.props.searchStats;
	    return (
	    	<header className='filter-parent'>
				<span className="filter-label">Search</span>
				<select onChange={this.updateType} defaultValue="Stories" name="searchIn" className='selectFilter'>
					<option value="(story,comment)">All</option>
					<option value="story">Stories</option>
					<option value="comment">Comments</option>
				</select>	
				<span className="filter-label">by</span>
				<select onChange={this.updateSort} defaultValue="Popularity" name="searchBy" className='selectFilter'>
					<option value="search">Popularity</option>
					<option value="search_by_date">Time</option>
				</select>
				<span className="filter-label">for</span>
				<select onChange={this.updateDateRange} defaultValue="All time" name="searchFor" className='selectFilter'>
				    <option value={null}>All time</option>
				    <option value={last24h}>Last 24h</option>
				    <option value={lastWeek} >Past Week</option>
				    <option value={lastMonth} >Past Month</option>
				    <option value={lastYear} >Past Year</option>
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
