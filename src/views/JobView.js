import React, {Component} from 'react';
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Spinner from "../components/utils/Spinner";
import {browserHistory} from "react-router";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class JobView extends Component {
    constructor(props) {
        super();
        this.state = {
            loading: true,
            error: "",
            job: {},
            removeClicks: 0,
        };
    }

    componentDidMount() {
        //Get job data from the api.
        const jobID = this.props.params.jobid;
        axios.get("http://localhost:7770/job/getjob/" + jobID).then((response)=> {
            if(response.data.ok === false) {
                this.setState({loading: false, error: response.data.error});
                return;
            }
            this.setState({loading: false, job: response.data.jobData});
        }).catch((err)=> {
            this.setState({loading: false, error: "There was a request error getting the job"});
        });
    }

    removeJob() {
        //Query the database to remove the job.
        const jobID = this.props.params.jobid;
        //Make sure the user clicks the button twice to prevent accidental removal of the job.
        if(this.state.removeClicks < 1) {
            this.setState({removeClicks: 1});
            return;
        }
        //Query the api to delete the job.
        axios.get("http://localhost:7770/job/deletejob/" + jobID).then((response)=> {
            browserHistory.push("/");
        }).catch((err)=> {
            browserHistory.push("/");
        });
        
    }

    editJob() {
    }
    
	render() {
        const jobID = this.props.params.jobid;
        
        //Remove button tooltip.
        const removeTooltip = (
            <Tooltip id="tooltip"><strong>Double click</strong> this button to remove the job.</Tooltip>
        );

        if(this.state.loading) {
            return (
                <div className="job-view">
                    <Navbar />
                    <div className="container">
                        <h3>This job is loading...</h3>
                        <Spinner />
                    </div>
                </div>
            );
        } 
        if(this.state.error) {
            return (
                <div className="job-view">
                    <Navbar />
                    <div className="container">
                        <h3>There was an error</h3>
                        <p>{this.state.error}</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="job-view">
                    <Navbar />
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-2">
                                <div className="job-menu">
                                    <OverlayTrigger placement="top" overlay={removeTooltip}>
                                        <div className="overlay-container">
                                            <i onClick={()=> this.removeJob()} className="fa fa-remove job-remove-button"></i> <span>Remove Job</span>
                                        </div>
                                    </OverlayTrigger>
                                    <br/>
                                    <i onClick={()=> this.editJob()} className="fa fa-pencil job-edit-button"></i> <span>Edit Job</span>
                                </div>
                            </div>
                            <div className="col-xs-10">
                                <div className="job-information">
                                    <h3>{this.state.job.title}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    
}

