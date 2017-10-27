import React, {Component} from 'react';
import axios from "axios";
import moment from "moment";

import Navbar from "../components/navbar/Navbar";
import Spinner from "../components/utils/Spinner";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Job from "../components/Jobs/Job";

//The page to create a job.
export default class ProfileView extends Component {

    constructor(props) {
        super();
        this.state = {
            loading: true,
            error: "",
            data: {}
        };
    }

    componentDidMount() {
        axios.get("http://localhost:7770/user/profile/" + this.props.params.profileName).then((response)=> {
            if(response.data.ok === false) {
                this.setState({loading: false, error: response.data.error});
                return;
            }
            this.setState({loading: false, data: response.data.profileData, userJobs: response.data.userJobs});
        }).catch((err)=> {
            this.setState({loading: false, error: "There was a server error getting the user profile data."});
        });
    }

	render() {
        const profileName = this.props.params.profileName;

        if(this.state.loading) {
            return(
                <div className="profile-view">
                    <Navbar />
                    <div className="container">
                        <h3>Loading the profile of {profileName}</h3>
                        <Spinner />
                    </div>
                </div>
            );
           
        } else if(this.state.error.length > 1) {
            return(
                <div className="profile-view">
                    <Navbar />
                    <div className="container">
                        <h3>There was an error loading the profile data...</h3>
                        <p>{this.state.error}</p>
                    </div>
                </div>
            );
                
        } else {
            const tooltipVerified = (
                <Tooltip id="tooltip">This is a <strong>verified</strong> user</Tooltip>
            );
            const createdAgo = moment(this.state.data.createdAt).fromNow();
            return (
                <div className="profile-view">
                    <Navbar />
                    <div className="container">
                        {this.state.data.verified ? <OverlayTrigger placement="bottom" overlay={tooltipVerified}><i className="fa fa-check" id="navbar-user-verified" ></i></OverlayTrigger> : <p></p>}<span className="profile-greeting">{this.state.data.username + "'s Profile"}</span>
                        <p className="profile-email">{this.state.data.email}</p>
                        <small>Created {createdAgo}</small> - <strong>Rank:</strong> {this.state.data.role}
                        <hr className="profile-divider" />
                        {this.state.userJobs.map((job, i)=> (
                            <Job title={job.title} body={job.body} assignee={job.assignedTo} dateDue={job.dateDue} id={job._id} key={i} />
                        ))}
                    </div>
                </div>
            );
        }
    }
    
}

