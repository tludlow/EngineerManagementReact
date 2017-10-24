import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from "react-router";
import * as actionCreators from '../../actions/actionCreators';
import axios from "axios";

class CreateLocationForm extends Component {

    constructor(props) {
        super();
        this.state = {
            currentPostcode: "",
            postcodeValid: false,
            postcodeData: {},
            postcodeError: "",
            buttonLoading: false,
            lat: 51.27,
            lng: 21.34
        };
    }
    
    handleCreateForm(e) {
        e.preventDefault();
        this.setState({buttonLoading: true});
        var formTitle = this.refs.formcreatelocationtitle.value;
        var formAddress = this.refs.formcreatelocationaddress.value;
        var formPostcode = this.state.currentPostcode;
        var formCustomer = this.refs.formcreatelocationcustomer.value;

        axios.post('http://localhost:7770/location/addLocation', {title: formTitle, address: formAddress, postcode: formPostcode, customer: formCustomer, lat: this.state.lat, lng: this.state.lng}).then((response) => {
            console.log(response);
            browserHistory.push("/");
            this.setState({buttonLoading: false});
        }).catch((err)=> {
            console.log(err);
            this.setState({buttonLoading: false});
        });
    }

    handlePostcodeChange(event) {
        this.setState({currentPostcode: event.target.value});
        if(event.target.value.length > 4) {
            this.queryPostcode(event.target.value);
        }
    }

    queryPostcode(postcode) {
        axios.get("https://api.postcodes.io/postcodes/" + postcode).then((response)=> {
            this.setState({postcodeError: "", postcodeData: response.data.result, postcodeValid: true, lat: response.data.result.latitude, lng: response.data.result.longitude});
        }).catch((err)=> {
            this.setState({postcodeError: "Your postcode has an error in it's format."});
        });
    }

	render() {
        return (
            <div className="createLocationForm">
                <br/>
                <form className="createLocationForm" onSubmit={(e) => this.handleCreateForm(e)}>			
                    <fieldset>
                        <p>Title</p>
                        <input type="text" placeholder="Title" ref="formcreatelocationtitle" required/>
                    </fieldset>
                    
                    <fieldset>
                        <p>Address</p>
                        <textarea type="email" rows="10" cols="160" placeholder="Address" ref="formcreatelocationaddress" required></textarea>
                    </fieldset>

                    <fieldset>
                        {this.state.postcodeError.length > 0 ? <strong className="error">{this.state.postcodeError}</strong> : ""}
                        <p>Postcode</p>
                        {this.state.postcodeValid ? <p><strong className="valid">{this.state.postcodeData.admin_ward}</strong></p> : ""}
                        {this.state.postcodeValid ? <p><strong className="valid">{this.state.postcodeData.admin_district}</strong></p> : ""}
                        <input type="text" placeholder="Postcode" value={this.state.currentPostcode} onChange={(event)=> this.handlePostcodeChange(event)} ref="formcreatelocationpostcode" required/>
                    </fieldset>

                    <fieldset>
                        <p>Customer</p>
                        <input type="text" placeholder="Customer" ref="formcreatelocationcustomer" required/>
                    </fieldset>

                    <button disabled={this.props.jobs.loading} type="submit" className="SignUpForm-submit btn btn-success">
                        {this.state.buttonLoading ? <i className="fa fa-spinner fa-pulse fa-fw SignUpForm__spinner"/> : 'Create Location'}
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

var CreateLocationFormClass = connect(mapStateToProps, mapDispatchToProps)(CreateLocationForm);

export default CreateLocationFormClass;
