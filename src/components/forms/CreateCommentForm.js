import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import axios from "axios";

class CreateCommentForm extends Component {

    constructor(props) {
        super();
        this.state = {
            error: ""
        };
    }

    handleCreateForm(e) {
        e.preventDefault();
        let userInput = this.refs.formcreatecommentcontent.value;
        if(userInput.length > 200) {
            this.setState({error: "Your comment is too long!"});
            return;
        }
        axios.post("http://localhost:7770/job/comment", {job: this.props.jobid, user: this.props.user.data.username, content: userInput}).then((response)=> {
            if(response.data.ok === false) {
                this.setState({error: response.data.error});
            }
            window.location.reload();
        }).catch((err)=> {
            this.setState({error: err});
        });
		
    }
    

	render() {
        return (
        <div className="createCommentForm">
            <br/>
            <form className="createCommentForm" onSubmit={(e) => this.handleCreateForm(e)}>			
                <fieldset>
                    <p>User Comments:</p>
                    <textarea placeholder="What are your thoughts?... max length of 200 characters." ref="formcreatecommentcontent" required/>
                </fieldset>

                {this.state.error.length > 1 ? <p className="error">There was an error...</p> : ""}
                {this.state.error.length > 1 ? <p className="error">{this.state.error}</p> : ""}
                <button type="submit" className="SignUpForm-submit btn btn-success">
					{this.props.jobs.loading ? <i className="fa fa-spinner fa-pulse fa-fw SignUpForm__spinner"/> : 'Create Comment'}
				</button>
                <br />
                <br />
                <br />
            </form>
        </div>
        ); 
	}
}

function mapStateToProps(state) {
	return {user: state.user, jobs: state.jobs};
}

export function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

var CreateCommentFormClass = connect(mapStateToProps, mapDispatchToProps)(CreateCommentForm);

export default CreateCommentFormClass;
