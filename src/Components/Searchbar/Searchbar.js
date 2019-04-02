
import React, { Component } from 'react';
import './Searchbar.css';
import {Link} from 'react-router-dom'
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

	componentDidMount(){
	    let location = window.location.pathname;
	    if(location !== '/'){
			let quer = '', i=7;
		    while(location[i]!=='/'){
		      quer+=location[i];
		      i++;
		    }
		    this.props.updateSearchQuery(quer);
			const field = document.getElementsByClassName('searchBar-main')[0];
			field.value = quer;
	    }
	}

	render() {
	    return (
			<div className="search-wrapper">
				<div className="searchbar-input-wrapper">
					<img src={searchIcon} alt='' className="search-icon"></img>
					<input type="search" 
						placeholder="Search stories by title, url or author" 
						autoComplete="new-password" 
						autoCapitalize="off" 
						spellCheck="false" 
						autoCorrect="off" 
						autoFocus 
						className="searchBar-main" 
						onChange={this.updateQuery}
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
