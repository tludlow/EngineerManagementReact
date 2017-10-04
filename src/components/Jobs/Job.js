import React, {Component} from 'react';

import moment from "moment";

export default class Job extends Component {

	render() {
        var relativeTime = moment(this.props.dateDue).fromNow();
        var toStyle;
        var dueSoon = false;
        if((relativeTime.includes("days") && parseInt(relativeTime.split(" ")[1]) < 4) || relativeTime.includes("hours") || relativeTime.includes("minutes") || relativeTime.split(" ")[2] === "day") {
            toStyle = {color: "red"};
            dueSoon = true;
        }
        
        return (
            <div className="job row">
                <div className="col-xs-12">
                    <h5 className="job-title">{this.props.title} - <small style={toStyle}>{relativeTime}</small> {dueSoon ? <span className="due-soon">Due Soon</span> : ""}</h5>
                    <p className="job-body">{this.props.body}</p>
                </div>
            </div>
        );
	}
}

