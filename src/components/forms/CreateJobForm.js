import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';

class CreateJobForm extends Component {


    handleCreateForm(e) {
        e.preventDefault();
        console.log("submitted");
		var formTitle = this.refs.formcreatejobtitle.value;
        var formBody = this.refs.formcreatejobbody.value;
        var formAssignee = this.refs.formcreatejobassignuser.value;
        var formDatePicked = this.refs.formcreatejobdate.value;

		this.props.createJob(formTitle, formBody, formAssignee, formDatePicked); //title, body, asiggnee, date
    }
    

	render() {
        //Work out the min value of the date needed to be injected in the form, this needs to be a string of the form "yyyy-mm-dd" where the
        //month and date, if only have one number need a zero before them.
        //also, javascript is silly and starts counting months at 0 so we need to add 1.
        let currentYear = new Date().getFullYear().toString();
        let currentMonth = new Date().getMonth() + 1;
        let currentDate = new Date().getDate();
        if(currentMonth < 10) {
            currentMonth = "0" + currentMonth;
        }
        if(currentDate < 10) {
            currentDate = "0" + currentDate;
        }
        const minDate = currentYear + "-" + currentMonth.toString() + "-" + currentDate.toString();

        return (
        <div className="createJobForm">
            <br/>
            <form className="createJobForm" onSubmit={(e) => this.handleCreateForm(e)}>			
                <fieldset>
                    <p>Title</p>
                    <input type="text" placeholder="Title" ref="formcreatejobtitle" required/>
                </fieldset>
                
                <fieldset>
                    <p>Body</p>
                    <textarea type="email" rows="10" cols="160" placeholder="Enter a detailed description about the job" ref="formcreatejobbody" required></textarea>
                </fieldset>

                <fieldset>
                    <p>Assign User</p>
                    <input type="text" placeholder="Assign user, type their username" ref="formcreatejobassignuser" required/>
                </fieldset>

                <fieldset>
                    <p>Date Due</p>
                    <input type="date" size="30" ref="formcreatejobdate"  min={minDate} required/>
                </fieldset>

                <button disabled={this.props.jobs.loading} type="submit" className="SignUpForm-submit btn btn-success">
					{this.props.jobs.loading ? <i className="fa fa-spinner fa-pulse fa-fw SignUpForm__spinner"/> : 'Create Job'}
				</button>
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

var CreateJobFormClass = connect(mapStateToProps, mapDispatchToProps)(CreateJobForm);

export default CreateJobFormClass;
