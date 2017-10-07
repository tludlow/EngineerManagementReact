import React, {Component} from 'react';
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Spinner from "../components/utils/Spinner";

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
        })
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
        } else {
            return (
                <div className="job-view">
                    <Navbar />
                    <div className="container">
                        <h3>{this.state.job.title}</h3>
                        <p>Created by: <small>{this.state.job.createdBy}</small></p>
                        <br/>
                        <br/>
                        <p>{this.state.job.body}</p>
                    </div>
                </div>
            );
        }
    }
    
}

