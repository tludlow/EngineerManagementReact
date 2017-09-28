import React, {Component} from 'react';

import Navbar from "../navbar/Navbar";

export default class LoggedOutView extends Component {
	render() {
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
	}
}

