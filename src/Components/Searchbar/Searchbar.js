
import React, { Component } from 'react';
import './Searchbar.css';
import {Link} from 'react-router-dom'
import searchIcon from '../../assets/search-3-xxl.png'

class Searchbar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
	    return (
	    	<div className='searchbar-parent'>
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
						/>
					</div>
					<span className="powered-by">
						by&nbsp;
						<a href="https://www.algolia.com/?utm_source=hn_search&amp;utm_medium=link&amp;utm_term=logo&amp;utm_campaign=hn_algolia" title="Realtime Search Engine" className="">
							<img width="60" height="15" src="//d3nb9u6x572n0.cloudfront.net/assets/algolia-logo-white-65086ed3930483340981cc7aaab1be051e38bc091406fd806d0ad05640c1bc28.svg" alt="Algolia logo white" />
						</a>
					</span>
		      	</div>
	      	</div>
	    );
	}
}

export default Searchbar;
