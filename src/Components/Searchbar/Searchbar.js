
import React, { Component } from 'react';
import './Searchbar.css';
import searchIcon from '../../assets/search-3-xxl.png'

class Searchbar extends Component {
	constructor(props) {
		super(props);
	}

	updateQuery = (event) =>{
		let {searchSettings} = this.props;
  		window.history.pushState(null, null, `/query=${event.target.value}/sort=${searchSettings.sort}/page=${searchSettings.page}/dateRange=${searchSettings.dateRange}/type=${searchSettings.type}`);
		this.props.updateSearchQuery(event.target.value);
	}
	_handleKeyPress = (event) => {
		console.log('Chh');
	    if(event.key === 'Enter' && this.props.searchSettings.query.length && this.props.isLoggedIn){
		console.log('Chh2', this.props.userInfo.email);
	    	let error=false;
			fetch('/api/query', {
				method: 'post',
				headers: {'Content-type': 'application/json'},
				body: JSON.stringify({
					email: this.props.userInfo.email,
					query: this.props.searchSettings.query
				})
			})
			.then(response => {
				if(response.status!==200)
					error=true;
				return response.json()})
			.then((user) => {
				if(error)
					throw(user);
				console.log(user);
			})
			.catch(err => console.log(err))
	    }
  	}

	componentDidMount(){
	}

	render() {
	    return (
			<div className="search-wrapper">
				<div className="searchbar-input-wrapper">
					<img src={searchIcon} alt='' className="search-icon"></img>
					<input id='queryf' type="search" 
						placeholder="Search stories by title, url or author" 
						autoComplete="new-password" 
						autoCapitalize="off" 
						spellCheck="false" 
						autoCorrect="off" 
						autoFocus 
						className="searchBar-main" 
						onChange={this.updateQuery}
						onKeyPress={this._handleKeyPress}
					/>
				</div>
				<span className="powered-by">
					by&nbsp;
					<a href="https://www.algolia.com/?utm_source=hn_search&amp;utm_medium=link&amp;utm_term=logo&amp;utm_campaign=hn_algolia" title="Realtime Search Engine" className="">
						<img width="60" height="15" src="//d3nb9u6x572n0.cloudfront.net/assets/algolia-logo-white-65086ed3930483340981cc7aaab1be051e38bc091406fd806d0ad05640c1bc28.svg" alt="Algolia logo white" />
					</a>
				</span>
	      	</div>
	    );
	}
}

export default Searchbar;
