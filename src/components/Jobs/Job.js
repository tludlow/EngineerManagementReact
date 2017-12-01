import React, {Component} from 'react';

import moment from "moment";
import {browserHistory} from "react-router";

export default class Job extends Component {

    //Navigate the user to the job given in the props.
    searchJob() {
        browserHistory.push("/job/" + this.props.id);
    }

    //Display the html to the user of the component
	render() {
        //Get the time in a humanized format.
        var relativeTime = moment(this.props.dateDue).fromNow();
        var toStyle;
        var dueSoon = false;
        var overDue = false;
        //Checks to see if the job is due soon, under 3 days.
        if((relativeTime.includes("days") && parseInt(relativeTime.split(" ")[1], 10) < 4) || relativeTime.includes("hours") || relativeTime.includes("minutes") || relativeTime.split(" ")[2] === "day") {
            toStyle = {color: "red"};
            dueSoon = true;
        }

        //The time humanized includes the word ago, meaning that it was in the past and therefore overdue.
        if(relativeTime.includes("ago")) {
            overDue = true;
        }
        
        return (
            <div className="job row job-item" onClick={()=> this.searchJob()}>
                <div className="col-xs-2">
                    <img src="http://via.placeholder.com/100x100" alt="" className="job-img"/>
                </div>
                <div className="col-xs-10">
                    <h5 className="job-title">{this.props.title} <span>-</span> <small style={toStyle}>{relativeTime}</small> {dueSoon ? <span className="due-soon">Due Soon</span> : ""}{overDue ? <span className="due-soon">OVERDUE</span> : ""}</h5>
                    <p className="job-assignee">Assigned to: <strong>{this.props.assignee.join(", ")}</strong></p>
                    <hr className="job-divider"/>
                    <p className="job-body">{this.props.body}</p>
                </div>
            </div>
        );
	}
}

