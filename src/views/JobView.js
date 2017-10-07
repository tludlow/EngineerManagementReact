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
            job: {}
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
        axios.get("http://localhost:7770/job/deletejob/" + jobID).then((response)=> {
            console.log(response);
        }).catch((err)=> {
            console.log(err);
        });
        browserHistory.push("/");
    }

    editJob() {
    }
    
	render() {
        const jobID = this.props.params.jobid;

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
        } else if(this.state.error) {
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
                                    <i onClick={()=> this.removeJob()} className="fa fa-remove job-remove-button"></i> Remove Job<br />
                                    <i onClick={()=> this.editJob()} className="fa fa-pencil job-edit-button"></i> Edit Job
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

