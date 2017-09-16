import React, {Component} from 'react';

export default class Home extends Component {

	clickHandler() {
		console.log(this.state.user.data.username);
		this.props.createNewPost(this.state.user.data.username, "Hello, welcome", "this is a very cool body of the post", "life, and stuff", this.state.user.data.token);
	}

	render() {
		return (
			<div className="home">
				<h2 onClick={() => this.clickHandler}>Click me to create a fake storie to test the app. hehe</h2>
			</div>
		);
	}
}
