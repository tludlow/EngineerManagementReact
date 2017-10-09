import React, {Component} from 'react';

import Navbar from "../components/navbar/Navbar";
import Auth from "../components/authentication/SignUp";

//The auth page.
export default class AuthView extends Component {
	render() {
		return (
			<div className="authview">
				<Navbar/>
				<Auth/>
			</div>
		);
	}
}