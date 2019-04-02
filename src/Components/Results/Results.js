import React, { Component } from 'react';
import './Results.css';
import {Link} from 'react-router-dom'
import {ResultCard} from './ResultCard'
import {Loader} from '../_Loader/Loader';
import Pagination from '../Pagination/Pagination'

class Results extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: [],
			isLoading: false
		}
	}
	componentDidMount(){
		let {sort, dateRange, type, page, query} = this.props.match.params;
		document.getElementById('typef').value=type;
		document.getElementById('sortf').value=sort;
		document.getElementById('datef').value=dateRange;
		if(query == undefined || query == null)
			query='';
		else
			document.getElementById('queryf').value=query;
		this.props.updateSearchSettings(sort, type, dateRange, page, query);
	}
	componentDidUpdate(prevProps, prevState){
		if(
			prevProps.searchSettings.type !== this.props.searchSettings.type ||
			prevProps.searchSettings.query !== this.props.searchSettings.query ||
			prevProps.searchSettings.page !== this.props.searchSettings.page ||
			prevProps.searchSettings.dateRange !== this.props.searchSettings.dateRange ||
			prevProps.searchSettings.sort !== this.props.searchSettings.sort
		){
			this.modifyAndUpdate();
		}
	}

	modifyAndUpdate = () => {
		let sort, dateRange, type;
		const {searchSettings} = this.props;
		switch(searchSettings.sort){
			case 'byPopularity': sort = 'search'; break;
			case 'byDate': sort = 'search_by_date'; break;
		}
		switch(searchSettings.dateRange){
			case 'all': dateRange = null; break;
			case 'last24h': dateRange = this.getLast24h(); break;
			case 'pastWeek': dateRange = this.getLastWeek(); break;
			case 'pastMonth': dateRange = this.getLastMonth(); break;
			case 'pastYear': dateRange = this.getLastYear(); break;
		}
		switch(searchSettings.type){
			case 'story': type = 'story'; break;
			case 'comment': type = 'comment'; break;
			case 'all': type = '(story,comment)'; break;
		}
		this.triggerSearchQuery(type, dateRange, sort, searchSettings.page);
	}

	triggerSearchQuery = (type, dateRange, sort, page) => {
		let url;
		this.setState({isLoading: true});
		if(dateRange === null){
			url = `https://hn.algolia.com/api/v1/${sort}?query=${this.props.searchSettings.query}&page=${page}&tags=${type}`;
		}
		else {
			url = `https://hn.algolia.com/api/v1/${sort}?query=${this.props.searchSettings.query}&page=${page}&tags=${type}&numericFilters=created_at_i>${dateRange}`;
		}
		fetch(url)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			this.setState({results: data.hits});
			this.props.updateSearchStats(data.nbHits, data.processingTimeMS/1000, data.nbPages);
			this.setState({isLoading: false});
		})
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
		const ResultList = ({ results }) => {
			const repComponent = results.map((res, i) => {
				return <ResultCard 
				key={i}
				id={res.objectID} 
				title={res.title}
				url={res.url}
				author = {res.author}
				points={res.points}
				date={res.created_at_i} 
				comment={res.comment_text}
				commentTitle={res.story_title}
				commentNum={res.num_comments}
				storyText={res.story_text}
				type={this.props.searchSettings.type}
		 		/> 
			});
			return repComponent;
		}
	    return (
	    	<div className='search-results-main'>
	    		{(this.state.results.length)?
		    		<div className='search-results pb3'>
			    		<ResultList results={this.state.results} />
			            <Pagination {...this.props} />
	    			</div>
	    			:
	    			(this.state.isLoading)?
	    				<Loader />
	    				:
	    				<div className='search-results tc'>
	    					No results
	    				</div>
	    		}
	    	</div>
	    );
	}
}

export default Results;
