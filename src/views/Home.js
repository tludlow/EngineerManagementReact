import React, {Component} from 'react';

import Navbar from "../components/navbar/Navbar";

export default class Home extends Component {

	render() {
		//Render this if not signed in
		if(!this.props.user.isLoggedIn) {
			return (
				<div className="homepage">
					<Navbar/>
					<div className="home container">
						<h3>Welcome to the engineer management application.</h3>
						<p>Made by <strong>Thomas Ludlow</strong> for my AQA Computer Science A-Level Coursework.</p>
						<br/>
						<p>Code viewable on github: <a href="https://github.com/tludlow99/EngineerManagementReact">Click me - frontend</a></p>
					</div>
				</div>
			);
		} else {
			//Render this when they are signed in.
			return (
				<div className="homepage">
					<Navbar/>
					<div className="home container">
						<h3>You are signed in.</h3>
						<h4>Meow</h4>
					</div>
				</div>
			);
		}
		
	}
}
