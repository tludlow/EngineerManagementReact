import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import axios from "axios";

import Navbar from "../navbar/Navbar";
import Spinner from "../utils/Spinner";
import Job from "../Jobs/Job";

class LoggedInView extends Component {

    constructor(props) {
		super(props);
		this.state = {
            isLoaded: false,
            error: "",
            jobs: []
        };
	}

    componentDidMount() {
        //Get the jobs.
        axios.get("http://localhost:7770/job/getJobs").then((response)=> {
            console.log(response);
            this.setState({isLoaded: true, jobs: response.data.jobs});
        }).catch((err)=> {
            this.setState({isLoaded: true, error: "There was an error getting the posts."});
        });
    }

	render() {
        if(this.state.isLoaded && this.state.error.length < 1) {
            return (
                <div className="homepage">
                    <Navbar />
                    <div className="container">
                        <h3>Jobs:</h3>
                        {this.state.jobs.map((job, i)=> (
                            <div className="row" key={i}>
                                <Job title={job.title} body={job.body} assignee={job.assignedTo} dateDue={job.dateDue} />
                            </div>
					    ))}
                    </div>
                </div>
            );
        } else if(this.state.isLoaded == false) {
            return (
                <div className="homepage">
                    <Navbar/>
                    <div className="home container">
                        {/* map over all jobs here and render them in the job component, pass through props.*/}
                        <Spinner />
                    </div>
                </div>
            );
        }
	}
}

function mapStateToProps(state) {
	return {user: state.user};
}

export function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

var LoggedInViewClass = connect(mapStateToProps, mapDispatchToProps)(LoggedInView);

export default LoggedInViewClass;
