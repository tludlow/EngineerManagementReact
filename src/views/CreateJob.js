import React, {Component} from 'react';

import Navbar from "../components/navbar/Navbar";

export default class CreateJob extends Component {

	render() {
        return (
            <div className="create-job">
                <Navbar />
                <div className="container">
                    <h3>Create Job:</h3>
                    <p>Create a new job in the system by filling out the form below.</p>
                </div>
            </div>
        );
    }
    
}

