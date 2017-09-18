import React, {Component} from 'react';

import Navbar from "../components/navbar/Navbar";

export default class Home extends Component {

	render() {
		return (
			<div className="homepage">
				<Navbar/>
				<div className="home container">
					<h3>Hello, homepage</h3>
				</div>
			</div>
		);
	}

}
