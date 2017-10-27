import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import axios from "axios";
import { Link } from "react-router";

import Navbar from "../navbar/Navbar";
import Spinner from "../utils/Spinner";
import Job from "../Jobs/Job";

class LoggedInView extends Component {

    constructor(props) {
		super(props);
		this.state = {
            isLoaded: false,
            error: "",
            jobs: [],
            locations: [],
            notifications: {},
        };
	}

    componentDidMount() {
        //Get the jobs from the api.
        axios.get("http://localhost:7770/job/getJobsAndLocations/" + localStorage.getItem("token")).then((response)=> {
            //We got an actual response but there was an error, make this known.
            if(response.data.ok === false) {
                this.setState({isLoaded: true, error: response.data.error});
                return;
            }
            //All is good, set the state.
            this.setState({isLoaded: true, jobs: response.data.jobs, locations: response.data.locations, notifications: response.data.notifications});
        }).catch((err)=> {
            //There was an errorm probably server related so let's tell the user.
            this.setState({isLoaded: true, error: "There was an error getting the data."});
        });
    }


	render() {
        //If the data is loaded and there is no error then map through all the gotten jobs and put them on the homepage.
        if(this.state.isLoaded && this.state.error.length < 1 ) {
            return (
                <div className="homepage">
                    <Navbar notification={this.state.notifications}/>
                    <div className="container">
                        <div className="col-xs-3">
                            <h3><strong>Locations:</strong></h3>
                            {this.state.locations.map((location, i)=> (
                                <div className="row locationHome" key={i}>
                                        <h4><strong>{i+1}</strong> - {location.title}</h4>
                                        <p>{location.address}</p>
                                        <p>{location.postcode}</p>
                                        <Link to={"/profile/" + location.customer}>{location.customer}</Link>
                                </div>
                            ))}
                        </div>
                        <div className="col-xs-9">
                            <h3><strong>Jobs:</strong></h3>
                            {this.state.jobs.map((job, i)=> (
                                <div className="row" key={i}>
                                    <Job title={job.title} body={job.body} assignee={job.assignedTo} dateDue={job.dateDue} id={job._id} />
                                </div>
					        ))}
                        </div>
                        
                        
                    </div>
                </div>
            );
            //If the jobs arent loaded yet.
        } else if(this.state.isLoaded === false) {
            return (
                <div className="homepage">
                    <Navbar/>
                    <div className="home container">
                        <Spinner />
                    </div>
                </div>
            );
            //Else, there was probably an error, let that be known.
        } else {
            return (
                <div className="homepage">
                    <Navbar/>
                    <div className="home container">
                        <h3>There was an error...</h3>
                        <p>{this.state.error}</p>
                    </div>
                </div>
            );
        }
	}
}

//Map the state of the application to the props.
function mapStateToProps(state) {
	return {user: state.user};
}

//Allow us to dispatch things to the state.
export function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

//Connect this all up and export it so other classes can import it.
var LoggedInViewClass = connect(mapStateToProps, mapDispatchToProps)(LoggedInView);

export default LoggedInViewClass;
