import React, { Component } from 'react';
import axios from "axios";
import { browserHistory } from "react-router";

import Navbar from "../components/navbar/Navbar";

export default class StaffDashboard extends Component {

	componentWillMount() {
		axios.get("http://localhost:7770/user/getRank/" + this.props.user.data.username).then((response)=> {
			if(response.data.error) {
				browserHistory.push("/");
				console.log("error getting data");
			} else {
				if(response.data.role !== "admin") {
					browserHistory.push("/");
				}
			}
		}).catch((err)=> {
			browserHistory.push("/");
			console.log("error getting data 2");
		});
	}
	render() {
		return (
			<div className="staff-dashboard">
				<Navbar />
				<div className="container">
					<h2>Staff Dashboard</h2>
					<p>Be careful on how you use this page, it's got actions on it that have consequences on this site.</p>
					<h4>After peforming an action on this page, the user should relog to have the action take effect.</h4>
				</div>
			</div>
		);
	}
}
