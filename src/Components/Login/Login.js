import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Loader} from '../_Loader/Loader'

class Login extends Component {

  constructor(props){
    super(props);
    this.state={
    	username: '',
    	password: '',
    	gotUserData: false,
    	verification: 1,
    	errorRes: "",
    	loading: true,
    	redirect: false,
    	loading2: false
    }
  }
	onPassChange = (event) => {
		this.setState({password:event.target.value});
	}
	onEmailChange = (event) => {
		this.setState({username:event.target.value});
	}
  componentWillMount(){
  	if(!this.props.isLoggedIn){
		fetch('/api/checkToken')
		.then(response => {
			if(response.status!==200)
				throw(response);
		    this.setState({ loading: false, redirect: true });
		    this.props.updateLoginState(true);
		})
		.catch(() => {
			this.setState({ loading: false });
		});
	} else {
		this.setState({loading: false, redirect: true});
	}
  }

  componentDidMount(){
  	// if(!this.props.isLoggedIn && !this.state.loading)
  	// 	registerFunctions(this);
  	document.getElementsByClassName('filter-parent')[0].style.display='none';
  	document.getElementsByClassName('search-wrapper')[0].style.display='none';
  }
  componentDidUpdate(prevProps, prevState){
  	// if(!this.state.loading && !this.props.isLoggedIn)
  	// 	registerFunctions(this);
  }
  componentWillUnmount(){
  	document.getElementsByClassName('filter-parent')[0].style.display='block';
  	document.getElementsByClassName('search-wrapper')[0].style.display='block';
 
  }

  requestLogin = () =>{
	this.setState({loading2: true});
  	let error=false;
	fetch('/api/signin', {
		method: 'post',
		headers: {'Content-type': 'application/json'},
		body: JSON.stringify({
			username: this.state.username,
			password: this.state.password
		})
	})
	.then(response => {
		if(response.status!==200)
			error=true;
		return response.json()})
	.then((user) => {
		if(error)
			throw(user);
		this.updateAllData(user);
		this.setState({
			loading2: false
		})
	})
	.catch(err => this.setState({errorRes: err}));
  }

  updateAllData = (user) => {
	this.props.updateLoginState(true);
	this.props.updateUser(user.user);
  }

  render() {
  	const { loading } = this.state;
  	if(this.state.redirect){
  		return <Redirect to='/dash' />
  	}

  	if(this.state.username && this.state.password && !this.state.gotUserData){
  		this.requestLogin();
  	}

  	if(this.state.gotUserData && this.state.verification){
  		return <Redirect to='/dash' />
  	}

    return (
  		
	   	<div className='register-container pt6'>
   		  <div id="progress"></div>
		  <div className="center">
		  	{
	  		(loading)?
	  			<Loader />
  			:
		  		(false)?
					<div className='f3 white'>
						Please verify your email to continue.
					</div>
				:
					(this.state.errorRes)?
						<div className='f3 white'>
							{this.state.errorRes}
						</div>
					:
					    <div id="register">
					    	<main className="pa4 black-80">
							  <form className="measure center">
							    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
							      <div className="mt3">
							        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
							        <input onClick={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-black w-100" type="email" name="email-address"  id="email-address" />
							      </div>
							      <div className="mv3">
							        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
							        <input onClick={this.onPassChange} className="b pa2 input-reset ba bg-transparent hover-black w-100" type="password" name="password"  id="password" />
							      </div>
							    </fieldset>
							    <div className="">
							      <div onClick={this.setState({gotUserData: true})} className="ph3 pv2 white input-reset ba bg-orange grow pointer f6 dib" type="submit" value="Sign in" >Sign in</div>
							    </div>
							    {(this.state.loading2)? <Loader /> : null}
							  </form>
							</main>

					    </div>
			}
  		   </div>
		</div>
    );
  }
}

export default Login;
