import React, {Component} from 'react';

import Navbar from "../components/navbar/Navbar";
import CreateLocationForm from "../components/forms/CreateLocationForm";

//The page to create a job.
export default class CreateLocation extends Component {

	render() {
        return (
            <div className="create-job">
                <Navbar />
                <div className="container">
                    <h3 className="main-info">Create Location:</h3>
                    <p>Fill out your information below for the location you wish to create.</p>
                    <CreateLocationForm />
                </div>
            </div>
        );
    }
    
}

