import React, {Component} from 'react';
import {Link, browserHistory} from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class Navbar extends Component {

	//Lob the user out by dispatching the userLogout() function and forcing them to refresh the homescreen.
	clickHandler() {
		this.props.userLogout();
		browserHistory.push("/");
	}
	
	render() {

		const tooltip = (
  			<Tooltip id="tooltip">Click me to <strong>Logout</strong></Tooltip>
		);
		const tooltipVerified = (
			<Tooltip id="tooltip">You are a verified user, yay!</Tooltip>
	  	);
		return (
			<div>
				<nav id="mainNav" className="navbar navbar-default navbar-custom">
					<div className="container">
						<div className="navbar-header page-scroll">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<div className="navbar-brand-container">
								<i className="fa fa-wrench" id="wrench-logo"></i>
								<Link to="/" className="navbar-brand">Engineer Management</Link>
							</div>
						</div>
						<div className="collapse navbar-collapse clearfix" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav navbar-right">
								<li className="hidden"><a href="#page-top">Page Top</a></li>
								<li>{this.props.user.isLoggedIn ? <p className="navbar-user">{this.props.user.data.verified ? <OverlayTrigger placement="bottom" overlay={tooltipVerified}><i className="fa fa-check" id="navbar-user-verified" ></i></OverlayTrigger> : <p></p>}{this.props.user.data.username} <OverlayTrigger placement="bottom" overlay={tooltip}><i onClick={()=> this.clickHandler()} className="fa fa-caret-down"></i></OverlayTrigger></p> : <Link to="/auth" className="navbar-signuporin">Sign Up / Sign In</Link>}</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {user: state.user};
}

export function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

var NavbarClass = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarClass;
