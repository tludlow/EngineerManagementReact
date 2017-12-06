import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import {browserHistory} from "react-router";

class AuthOnlyView extends Component {

    //Check for the user being logged in, if not redirect.
    componentWillMount() {
        if(!this.props.user.isLoggedIn) {
            browserHistory.push("/auth");
            return;
        }
    }
}

//These functions below connect the component to the internal redux state in this component without having to pass data down through the component hierarchy
function mapStateToProps(state) {
	return {user: state.user};
}

export function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

var AuthOnlyClass = connect(mapStateToProps, mapDispatchToProps)(AuthOnlyView);

export default AuthOnlyClass;
