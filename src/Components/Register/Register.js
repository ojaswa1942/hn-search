import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {Loader} from '../_Loader/Loader'

class Register extends Component {

  constructor(props){
    super(props);
    this.state={
    	username: '',
    	password: '',
    	name: '',
    	gotUserData: false,
    	errorRes: "",
    	error: true,
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
	onNameChange = (event) => {
		this.setState({name:event.target.value});
	}
	_handleKeyPress = (event) => {
	    if(event.key === 'Enter'){
	      this.handleClick();
	    }
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
		.catch((err) => {
			console.log(err);
			this.setState({loading: false});
		});
	} else {
		this.setState({loading: false, redirect: true});
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
  handleClick = () =>{
	if(!this.state.password || !this.state.username || !this.state.name){
		(document.getElementsByClassName('errorHere2'))[0].style.display = 'none';
		(document.getElementsByClassName('errorHere'))[0].style.display = 'unset';
	}
	else if(!this.state.username.match(/^(?=[A-Za-z0-9][A-Za-z0-9@._%+-]{5,253}$)[A-Za-z0-9._%+-]{1,64}@(?:(?=[A-Za-z0-9-]{1,63}\.)[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\.){1,8}[A-Za-z]{2,5}$/)){
		(document.getElementsByClassName('errorHere'))[0].style.display = 'none';
		(document.getElementsByClassName('errorHere2'))[0].style.display = 'unset';
	}
	else{
		(document.getElementsByClassName('errorHere'))[0].style.display = 'none';
		(document.getElementsByClassName('errorHere2'))[0].style.display = 'none';
  		this.requestRegistration();
	}
  }

  requestRegistration = () =>{
  	if(!this.state.loading2){
		this.setState({loading2: true});
	  	let error=false;
		fetch('/api/register', {
			method: 'post',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
				name: this.state.name
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
				loading2: false,
				redirect: true
			})
		})
		.catch(err => this.setState({errorRes: err, loading2: false}));
	}
  }
  updateAllData = (user) => {
	this.props.updateLoginState(true);
	this.props.updateUserInfo(user);
  }

  render() {
  	const { loading } = this.state;
  	if(this.state.redirect){
  		return <Redirect to='/dash' />
  	}

  	if(this.state.gotUserData && this.state.verification){
  		// return <Redirect to='/login' />
  	}

    return (
  		
	   	<div className='register-container pt6'>
		  <div className="center">
		  	{
	  		(loading)?
	  			<Loader />
  			:
			    <div id="register">
			    	<main className="pa4 black-80">
					  <form className="measure center">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
					        <input onKeyPress={this._handleKeyPress} onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-black w-100" type="text" name="name"  id="" />
					      </div>						      
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input onKeyPress={this._handleKeyPress} onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-black w-100" type="email" name="email-address"  id="email-address" />
					      </div>

					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input onKeyPress={this._handleKeyPress} onChange={this.onPassChange} className="b pa2 input-reset ba bg-transparent hover-black w-100" type="password" name="password"  id="password" />
					      </div>
					    </fieldset>
					    <div className="">
					      <div onClick={this.handleClick} className="ph3 pv2 white input-reset ba bg-orange grow pointer f6 dib" type="submit" value="Sign up" >Sign up</div>
					    </div>
					    {(this.state.loading2)? <Loader /> : null}
					  </form>
					  <div className='w-100 tc'>
						<div className='errorHere red fw1'>All fields required</div>
						<div className='errorHere2 red fw1'>Invalid Email</div>
						<div className='red b fw1'>{this.state.errorRes.toString()}</div>
					</div>
					</main>
			    </div>
			}
  		   </div>
		</div>
    );
  }
}

export default Register;
