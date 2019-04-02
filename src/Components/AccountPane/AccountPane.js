
import React, { Component } from 'react';
import './AccountPane.css';
import {Link} from 'react-router-dom'
import accountPic from '../../assets/account.png'

class AccountPane extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	componentDidMount(){
	}

	render() {
		let searchSettings = {
		    type: 'story',
		    dateRange: 'all',
		    sort: 'byPopularity',
		    query: '',
		    page: 0
	  	}
	    return (
	 		<div className='accountDrop'>
	            <img src={accountPic} className='accountPic' />
	            <ul className="dropdown">
	                <a href={`/query=${searchSettings.query}/sort=${searchSettings.sort}/page=${searchSettings.page}/dateRange=${searchSettings.dateRange}/type=${searchSettings.type}`}><li className='pointer'>Search</li></a>
	                <Link to='/register'><li className='pointer'>Register</li></Link>
	                <Link to='/login'><li className='pointer'>Login</li></Link>
	            </ul>
	 		</div>
	    );
	}
}

export default AccountPane;
