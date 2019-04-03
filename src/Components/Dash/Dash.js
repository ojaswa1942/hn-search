import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Loader} from '../_Loader/Loader'
import ReportCard from './ReportCard';

class Dash extends Component {

  constructor(props){
    super(props);
    this.state={
    	gotUserData: false,
    	errorRes: "",
    	error: true,
    	loading: true,
    	redirect: false,
    	loading2: false,
    	history: []
    }
  }

  componentWillMount(){
  	if(!this.props.isLoggedIn){
		fetch('/api/checkToken')
		.then(response => {
			if(response.status!==200)
				throw(response);
		    this.setState({ loading: false, redirect: false });
		    this.props.updateLoginState(true);
		})
		.catch((err) => {
			console.log(err);
			this.setState({loading: false, redirect: true});
		});
	} else {
		this.setState({loading: false, redirect: false});
	}
  }

  componentDidMount(){
  	document.getElementsByClassName('filter-parent')[0].style.display='none';
  	document.getElementsByClassName('search-wrapper')[0].style.display='none';
  }
  componentDidUpdate(prevProps, prevState){
  }
  componentWillUnmount(){
  	document.getElementsByClassName('filter-parent')[0].style.display='block';
  	document.getElementsByClassName('search-wrapper')[0].style.display='block';
 
  }

  requestQueries = () =>{
  	if(!this.state.loading2){
		this.setState({loading2: true});
	  	let error=false;
		fetch('/api/queryGet', {
			method: 'post',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
				email: this.props.userInfo.email
			})
		})
		.then(response => {
			if(response.status!==200)
				error=true;
			return response.json()})
		.then((user) => {
			if(error)
				throw(user);
			this.setState({
				loading2: false,
				redirect: false,
				gotUserData: true,
				history: user
			})
		})
		.catch(err => this.setState({errorRes: err, loading2: false}));
	}
  }

  render() {
  	console.log(this.state, this.state.history);
  	const { loading } = this.state;
  	if(this.state.redirect){
  		return <Redirect to='/login' />
  	}

  	if(this.props.userInfo.name && !this.state.gotUserData){
  		this.requestQueries();
  	}
  	const error = this.state.errorRes;
  	let searchSettings = {
	    type: 'story',
	    dateRange: 'all',
	    sort: 'byPopularity',
	    query: '',
	    page: 0
  	}
  	const ReportList = ({ report }) => {
		const repComponent = report.map((rep, i) => {
			return <ReportCard 
			key={i}
			serial={i}
			query={rep.query}
			date = {rep.date}
			link={`/query=${rep.query}/sort=${searchSettings.sort}/page=${searchSettings.page}/dateRange=${searchSettings.dateRange}/type=${searchSettings.type}`}
	 		/> 
		});
		return (
        <div className='black flex flex-column items-center w-100 mh4-ns mh1'>
          <table className="f4 w-100" cellSpacing="0">
            <thead>
              <tr>
                <th className="fw6-ns fw8 bb b--white-20 tc pb3 pr3">No.</th>
                <th className="fw6-ns fw8 bb b--white-20 tc pb3 pr3">Query</th>
                <th className="fw6-ns fw8 bb b--white-20 tc pb3 pr3">Link</th>
                <th className="fw6-ns fw8 bb b--white-20 tc pb3 pr3">Time</th>
              </tr>
            </thead>
            <tbody className="lh-copy" id='leader-body'>
              {repComponent}
            </tbody>
          </table>
        </div>
      );
	}
    return (
  		
	   	<div className='register-container search-results-main pt6'>
		  <div className="center">
		  	{
	  		(loading)?
	  			<Loader />
  			:
  			<div className='ml3 f5'> Hello {this.props.userInfo.name},  				
  				<br />
  				Your email is: {this.props.userInfo.email}
  				<br />
  				<b >Your search query history is:</b>
  				<div className='ma3'>
  					<ReportList report = {this.state.history} />
				</div>
			</div>

			}
  		   </div>
		</div>
    );
  }
}

export default Dash;
