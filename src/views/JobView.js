import React, {Component} from 'react';
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Spinner from "../components/utils/Spinner";
import {Link, browserHistory} from "react-router";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import JobMap from "../components/Map/MyMap";
import CreateCommentForm from "../components/forms/CreateCommentForm";
import moment from "moment";

//Page to look at the individual job.
export default class JobView extends Component {
    constructor(props) {
        super();
        this.state = {
            loading: true,
            error: "",
            job: {},
            removeClicks: 0,
            lat: 0,
            lng: 0,
            comments: {}
        };
    }
    
    //Load the job data from the api specific to the id.
    componentDidMount() {
        //Get job data from the api.
        const jobID = this.props.params.jobid;
        axios.get("http://localhost:7770/job/getjob/" + jobID).then((response)=> {
            //there was a response but the response had an errorm let it be known.
            if(response.data.ok === false) {
                this.setState({loading: false, error: response.data.error});
                return;
            }
            //All is good.
            this.setState({loading: false, job: response.data.jobData, lat: response.data.lat, lng: response.data.lng, comments: response.data.comments});
        }).catch((err)=> {
            //There was an error, tell the user.
            this.setState({loading: false, error: "There was a request error getting the job"});
        });
    }

    //Logic to remove the job from the database, includes database post request and makes sure the user clicks
    //the button twice so there is no mistake that you actually want to delete the job.
    removeJob() {
        //Query the database to remove the job.
        const jobID = this.props.params.jobid;
        //Make sure the user clicks the button twice to prevent accidental removal of the job.
        if(this.state.removeClicks < 1) {
            this.setState({removeClicks: 1});
            return;
        }
        //Query the api to delete the job.
        axios.get("http://localhost:7770/job/deletejob/" + jobID + "/" + localStorage.getItem("token")).then((response)=> {
            browserHistory.push("/");
        }).catch((err)=> {
            browserHistory.push("/");
        });
        
    }

    
	render() {
        //Remove button tooltip.
        const removeTooltip = (
            <Tooltip id="tooltip"><strong>Double click</strong> this button to remove the job.</Tooltip>
        );

        //The job data is loading, display the spinner.
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
        //We had an error getting the data.
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
            //All is good, display the job.
            return (
                <div className="job-view">
                    <Navbar />
                    <br />
                    <div className="container">
                        <JobMap lat={this.state.lat} long={this.state.lng}/>
                        <br />
                        <div className="row">
                            <div className="col-xs-2">
                                <div className="job-menu">
                                    <OverlayTrigger placement="top" overlay={removeTooltip}>
                                        <div className="overlay-container">
                                            <i onClick={()=> this.removeJob()} className="fa fa-remove job-remove-button"></i> <span>Remove Job</span>
                                        </div>
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <div className="col-xs-10">
                                <div className="job-information">
                                    <h3><strong>{this.state.job.title}</strong></h3>
                                    <p>Assigned To: {this.state.job.assignedTo.map((person, i) => (
                                        <Link key={i} to={"/profile/" + person}>{person} </Link>
                                    ))}</p>
                                    <p>Created By: <Link to={"/profile/" + this.state.job.createdBy}>{this.state.job.createdBy}</Link></p>
                                    <p>{this.state.job.body}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <CreateCommentForm jobid={this.state.job._id} />
                                <hr/>
                                {this.state.comments.map((comment, i)=> (
                                    <div key={i} className="comment">
                                        <h5 className="bold">{comment.user} <small>- {moment(comment.createdAt).fromNow()}</small></h5>
                                        <p>{comment.content}</p>
                                        <br/>
                                        <br/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    
}

