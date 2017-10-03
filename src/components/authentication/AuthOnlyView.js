import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import {browserHistory} from "react-router";

class AuthOnlyView extends Component {

	componentWillMount() {
        if(!this.props.user.isLoggedIn) {
            browserHistory.push("/auth");
            return;
        }
    }
}

function mapStateToProps(state) {
	return {user: state.user};
}

export function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

var AuthOnlyClass = connect(mapStateToProps, mapDispatchToProps)(AuthOnlyView);

export default AuthOnlyClass;
