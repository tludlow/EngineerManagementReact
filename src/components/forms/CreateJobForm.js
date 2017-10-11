import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';

class CreateJobForm extends Component {

    constructor(props) {
        super();
        this.state = {
            assignedTo: [],
            assigneeFieldInput: "",
        };
    }
    handleCreateForm(e) {
        e.preventDefault();
        console.log("submitted");
		var formTitle = this.refs.formcreatejobtitle.value;
        var formBody = this.refs.formcreatejobbody.value;
        var formAssignee = this.refs.formcreatejobassignuser.value;
        var formDatePicked = this.refs.formcreatejobdate.value;

		this.props.createJob(formTitle, formBody, this.state.assignedTo, formDatePicked); //title, body, asiggnee, date
    }

    handleAssigneeChange(event) {
        var inputted = event.target.value.replace(/\s/g, ''); //Regular expression (global match) to replace spaces with nothing!
        console.log(inputted);
        this.setState({assigneeFieldInput: event.target.value, assignedTo: inputted.split(",")});
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
                    <small>If assigning multiple users, seperate names with commas as such jeff,bill,bob</small><br/>
                    <small>Assigned to: {this.state.assignedTo.length ? (this.state.assignedTo.join(",")) : 'Nobody!'}</small>
                    <input type="text" value={this.state.assigneeFieldInput} placeholder="Assign user, type their username(s)" ref="formcreatejobassignuser" onChange={(event)=> this.handleAssigneeChange(event)} required/>
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
