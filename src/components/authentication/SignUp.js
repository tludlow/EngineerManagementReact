import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMessage: "",
			view: "signin"
		};
	}

	componentDidMount() {
		this.setState({errorMessage: ""});
	}

	handleSubmitSignup(e) {
		e.preventDefault();
		var usernameInput = this.refs.signupusername.value;
		var emailInput = this.refs.signupemail.value;
		var passwordInput = this.refs.signuppasswordone.value;
		var confirmPasswordInput = this.refs.signuppasswordtwo.value;

		//Check if the passwords entered match.
		if (passwordInput !== confirmPasswordInput) {
			this.setState({errorMessage: "Your passswords don't match."});
			return;
		}
		//Check if the username is one word and doesn't contain characters it shouldnt.
		if (!/^[A-Z0-9_-]{3,30}$/i.test(usernameInput)) {
			this.setState({errorMessage: "Your username isn't of the right format, it should be one word and contain only these '-' and '_' special characters. It should also be between 3 and 30 characters."});
			return;
		}
		// Check if the username is off the right length > 3 characters and <= 30
		// characters.
		if (usernameInput.length > 30 || usernameInput.length < 3) {
			this.setState({errorMessage: "Your username should be longer than 3 characters and less than 30, which yours is not."});
			return;
		}
		//Check if the email is in an email format, I don't like the html warning thing
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailInput)) {
			this.setState({errorMessage: "Your email is not in the format of an actual email."});
			return;
		}

		this.props.signUpUser(usernameInput, passwordInput, emailInput);

	}

	handleSubmitLogin(e) {
		e.preventDefault();
		var usernameInput = this.refs.loginusername.value;
		var passwordInput = this.refs.loginpassword.value;

		this.props.loginUser(usernameInput, passwordInput);
	}

	changeView() {
		this.state.view === "signup" ? this.setState({view: "signin"}) : this.setState({view: "signup"});
		this.setState({errorMessage: ""});
	}

	// <button className="SignUpForm__button" disabled={this.props.invalid ||
	// isAuthenticating} type="submit"> {isAuthenticating ? <i className="fa
	// fa-spinner fa-pulse fa-3x fa-fw SignUpForm-Spinner" /> :'Sign Up'} </button>
	render() {
		//Render the signup view.
		if (this.state.view === "signup") {
			return (
			<div className="signUpFormArea container">
				<h3 className="main-info">Sign Up</h3>
				<p>Create an account to interact with the system.</p>
				<br/>
				<form className="SignUpForm" onSubmit={(e) => this.handleSubmitSignup(e)}>			
					<fieldset>
						<p>Username</p>
						<input type="text" placeholder="Username" className="SignUpForm-username" ref="signupusername" required/>
					</fieldset>
					
					<fieldset>
						<p>Email</p>
						<input type="email" placeholder="Email" className="SignUpForm-email" ref="signupemail" required/>
					</fieldset>

					<fieldset>
						<p>Password</p>
						<input type="password" placeholder="Create Password" className="SignUpForm-password" ref="signuppasswordone" required/>
					</fieldset>

					<fieldset>
						<p>Confirm Password</p>
						<input type="password" placeholder="Confirm Password" className="SignUpForm-password" ref="signuppasswordtwo" required/>
					</fieldset>

					<p className="formErrors">{this.props.user.error}</p>
					<p className="formErrors">{this.state.errorMessage}</p>

					<button disabled={this.props.user.loading} type="submit" className="SignUpForm-submit btn btn-success">
						{this.props.user.loading ? <i className="fa fa-spinner fa-pulse fa-fw SignUpForm__spinner"/> : 'Sign Up'}
					</button>
				</form>
				<br/>
				<br/>
				<p>Already have account? <span className="authViewChanger" onClick={() => this.changeView()}> sign in.</span></p>
			</div>
			);
			//Render the login view.
		} else {
			return (
			<div className="signInFormArea container">
				<h3 className="main-info">Sign In</h3>
				<p>Already have an account and want to access it, sign in below.</p>
				<br/>
				<form className="LoginForm" onSubmit={(e) => this.handleSubmitLogin(e)}>

					<fieldset>
						<p>Username</p>
						<input type="text" placeholder="Username" className="SignUpForm-username" ref="loginusername" required/>
					</fieldset>

					<fieldset>
						<p>Password</p>
						<input type="password" placeholder="Password" className="SignUpForm-password" ref="loginpassword" required/>
					</fieldset>

					<p className="formErrors">{this.props.user.error}</p>
					<p className="formErrors">{this.state.errorMessage}</p>

					<button disabled={this.props.user.loading} type="submit" className="SignUpForm-submit btn btn-success">
						{this.props.user.loading ? <i className="fa fa-spinner fa-pulse fa-fw SignUpForm__spinner"/> : 'Login'}
					</button>
				</form>
				<br/>
				<br/>
				<p>Don't have an account and want to go back? <span className="authViewChanger" onClick={() => this.changeView()}> sign up. </span></p>
			</div>
			);
		}
	}
}
// expose the user state to this component so we dont need to pass up state
// through props to the parent component. Probably isnt the best way to do this
// But will be good for now.
function mapStateToProps(state) {
	return {user: state.user};
}

export function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

var SignUpClass = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUpClass;