import React, {Component} from 'react';

export default class ErrorPage extends Component {

	clickHandler() {
		window.location.reload();
	}

	render() {
		return (
			<div className="error-page">
				<h3>An error has occured, please return to your homepage.</h3>
				<p><span>ERROR: </span>{this.props.error}</p>
				<p>Please reload your page to try again.</p>
				<a href="/" onClick={() => this.clickHandler()}>Home</a>
			</div>
		);
	}

}