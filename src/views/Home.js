import React, {Component} from 'react';


import LoggedInView from "../components/home/LoggedInView";
import LoggedOutView from "../components/home/LoggedOutView";

export default class Home extends Component {

	render() {
		//Render this if not signed in
		if(!this.props.user.isLoggedIn) {
			return (
				<LoggedOutView />
			);
		} else {
			//Render this when they are signed in.
			return (
				<LoggedInView />
			);
		}
		
	}
}
