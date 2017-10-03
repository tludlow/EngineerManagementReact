import React, {Component} from 'react';

import moment from "moment";

export default class Job extends Component {

	render() {
        var relativeTime = moment(this.props.dateDue).fromNow();
        return (
            <div className="job row">
                <div className="col-xs-12">
                    <h5 className="job-title">{this.props.title} - <small>{relativeTime}</small></h5>
                    <p className="job-body">{this.props.body}</p>
                </div>
            </div>
        );
	}
}

