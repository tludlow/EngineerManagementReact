import React, {Component} from 'react';

import Navbar from "../components/navbar/Navbar";

export default class WriteStorie extends Component {

	handlePostSubmit(e) {
		e.preventDefault();
		//Check if logged in to create a new storie.
		if(this.props.user.isLoggedIn === false) {
			console.log("You must be logged in to create a post idiot.");
			return;
		}

		var title = this.refs.writestorietitle.value;
		var category = this.refs.writestoriecategory.value;
		var body = this.refs.writestoriebody.value;

		//Authot, title, body, category, token
		this.props.createNewPost(this.props.user.data.username, title, body, category);
	}

	render() {
		return (
			<div className="write-story">
				<Navbar/>
				<div className="container">
					<h3>Write a new storie.</h3>
					<p>Write about a compelling, informative or interesting experience and share it with the world.</p>
					<br/>
					<form className="writeStorieForm" onSubmit={(e) => this.handlePostSubmit(e)}>
						<fieldset>
							<p>Title</p>
							<input type="text" placeholder="Title" className="writeStorie-title" ref="writestorietitle" required/>
						</fieldset>

						<fieldset>
							<p>Category</p>
							<input type="text" placeholder="Category" className="writeStorie-category" ref="writestoriecategory" required/>
						</fieldset>

						<fieldset>
							<p>Post Content</p>
							<textarea placeholder="Body" type="textarea" size="20" rows="6" className="form-control text-center writeStorie-body" ref="writestoriebody" required></textarea>
						</fieldset>

						<br/>
						<br/>
						
						<button type="submit" className="btn btn-success">
							Create Post
						</button>
					</form>
				</div>
			</div>
		);
	}
}
