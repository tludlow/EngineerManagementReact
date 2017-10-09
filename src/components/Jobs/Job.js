import React, {Component} from 'react';

import moment from "moment";
import {browserHistory} from "react-router";

export default class Job extends Component {

    searchJob() {
        browserHistory.push("/job/" + this.props.id);
    }

	render() {
        var relativeTime = moment(this.props.dateDue).fromNow();
        var toStyle;
        var dueSoon = false;
        var overDue = false;
        if((relativeTime.includes("days") && parseInt(relativeTime.split(" ")[1], 10) < 4) || relativeTime.includes("hours") || relativeTime.includes("minutes") || relativeTime.split(" ")[2] === "day") {
            toStyle = {color: "red"};
            dueSoon = true;
        }

        if(relativeTime.includes("ago")) {
            overDue = true;
        }
        
        return (
            <div className="job row job-item" onClick={()=> this.searchJob()}>
                <div className="col-xs-12">
                    <h5 className="job-title">{this.props.title} <span>-</span> <small style={toStyle}>{relativeTime}</small> {dueSoon ? <span className="due-soon">Due Soon</span> : ""}{overDue ? <span className="due-soon">OVERDUE</span> : ""}</h5>
                    <p className="job-assignee">Assigned to: <strong>{this.props.assignee.join(", ")}</strong></p>
                    <p className="job-body">{this.props.body}</p>
                </div>
            </div>
        );
	}
}

