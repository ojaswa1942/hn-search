import React, { Component } from 'react';
import './Results.css';
import {Link} from 'react-router-dom'
import {ResultCard} from './ResultCard'

class Results extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount(){
	}

	render() {
	    return (
	    	<div className='search-results-main'>
	    		<div className='search-results'>
		    		<ResultCard />
	    		</div>
	    	</div>
	    );
	}
}

export default Results;
