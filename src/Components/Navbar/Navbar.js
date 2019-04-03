
import React, { Component } from 'react';
import './Navbar.css';
import hnLogo from '../../assets/logo-hn-search.png'
import {Link} from 'react-router-dom'
import Searchbar from '../Searchbar/Searchbar'
import Filter from '../Filter/Filter'
import AccountPane from '../AccountPane/AccountPane'

class Navbar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
	    return (
		      <div className="navbar-parent">
		        <header className="nav-header">
					<div className="logo-wrapper">
						<a className="logo" href="/">
							<img alt='logo' className="logoNav" src={hnLogo} />
						</a>
						<a className="logo" href="/">
							<div className="logo-name">
								Search
								<br />
								Hacker News
							</div>
						</a>
					</div>
					
					<Searchbar userInfo={this.props.userInfo} isLoggedIn={this.props.isLoggedIn} updateSearchQuery={this.props.updateSearchQuery} searchQuery={this.props.searchSettings.query} searchSettings={this.props.searchSettings} />
					<AccountPane {...this.props} />
					<Filter {...this.props} />
				</header>
		      </div>
	    );
	}
}

export default Navbar;
