import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';

class Job extends Component {

	render() {
        return (
            <div className="job row">
                <div className="col-xs-12">
                    <p className="job-title">{this.props.title}</p>
                </div>
            </div>
        );
	}
}

function mapStateToProps(state) {
	return {user: state.user};
}

export function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

var JobClass = connect(mapStateToProps, mapDispatchToProps)(Job);

export default JobClass;
