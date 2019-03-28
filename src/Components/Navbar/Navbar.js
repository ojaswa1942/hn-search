
import React, { Component } from 'react';
import './Navbar.css';
import hnLogo from '../../assets/logo-hn-search.png'
import {Link} from 'react-router-dom'
import Searchbar from '../Searchbar/Searchbar'
import Filter from '../Filter/Filter'

class Navbar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
	    return (
		      <div className="navbar-parent">
		        <header className="nav-header">
					<div className="logo-wrapper">
						<Link className="logo" to="/?">
							<img alt='logo' className="logoNav" src={hnLogo} />
						</Link>
						<Link className="logo" to="/?">
							<div className="logo-name">
								Search
								<br />
								Hacker News
							</div>
						</Link>
					</div>
					
					<Searchbar updateSearchQuery={this.props.updateSearchQuery} />
					<Filter {...this.props} />
				</header>
		      </div>
	    );
	}
}

export default Navbar;
