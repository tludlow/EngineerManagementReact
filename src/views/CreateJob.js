import React, {Component} from 'react';

import Navbar from "../components/navbar/Navbar";
import CreateJobForm from "../components/forms/CreateJobForm";

//The page to create a job.
export default class CreateJob extends Component {

	render() {
        return (
            <div className="create-job">
                <Navbar />
                <div className="container">
                    <h3 className="main-info">Create Job:</h3>
                    <p>Create a new job in the system by filling out the form below.</p>
                    <CreateJobForm />
                </div>
            </div>
        );
    }
    
}

