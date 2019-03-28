
import React, { Component } from 'react';
import './Filter.css';
import {Link} from 'react-router-dom'

class Filter extends Component {
	constructor(props) {
		super(props);
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
	render() {
		let {number, timeTaken} = this.props.searchStats;
	    return (
	    	<header className='filter-parent'>
				<span className="filter-label">Search</span>
				<select onChange={this.updateType} defaultValue="Stories" name="searchIn" className='selectFilter'>
					<option value="All">All</option>
					<option value="Stories">Stories</option>
					<option value="Comments">Comments</option>
				</select>	
				<span className="filter-label">by</span>
				<select onChange={this.updateSort} defaultValue="Popularity" name="searchBy" className='selectFilter'>
					<option value="Popularity">Popularity</option>
					<option value="Time">Time</option>
				</select>
				<span className="filter-label">for</span>
				<select onChange={this.updateDateRange} defaultValue="All time" name="searchFor" className='selectFilter'>
				    <option value="All time">All time</option>
				    <option value="Last 24h">Last 24h</option>
				    <option value="Past Week">Past Week</option>
				    <option value="Past Month">Past Month</option>
				    <option value="Past Year">Past Year</option>
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
