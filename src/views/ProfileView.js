import React, {Component} from 'react';
import axios from "axios";
import moment from "moment";

import Navbar from "../components/navbar/Navbar";
import Post from "../components/post/Post";

export default class ProfileView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			profileData: {},
			loaded: false,
			error: "",
		};
	}

	componentDidMount() {
		//Get the user profile data.
		const profileName = this.props.params.profileName;
		axios.get("http://localhost:7770/user/getProfile/" + profileName).then((response)=> {
			if(response.data.ok === false) {
				//We got a response here but the data we got back was bad.
				this.setState({loaded: true, error: response.data.error});
				return;
			}
			this.setState({loaded: true, profileData: response.data.profile});
		}).catch((err)=> {
			this.setState({loaded: true, error: "An error occured getting the data from the server."});
		});
	}
	
	render() {
		const profileName = this.props.params.profileName;
		if(this.state.loaded === false) {
			return(
				<div className="profile-view">
					<Navbar/>
					<div className="container">
						<h4>Loading profile...</h4>
					</div>
				</div>
			);
		}
		if(this.state.error) {
			return(
				<div className="profile-view">
					<Navbar/>
					<div className="container">
						<h4>When getting the data for {profileName}'s profile we had an error</h4>
						<p>{this.state.error}</p>
					</div>
				</div>
			);
		} else {
			var relativeTime = moment(this.state.profileData.createdAt).fromNow();
			console.log(this.state.profileData.posts);
			return (
				<div className="profile-view">
					<Navbar/>
					<div className="container">
						<h4>Hello, this is a profile for {profileName}.</h4>
						<br/>
						
						<p><strong>Username:</strong> {this.state.profileData.username} 
						{this.state.profileData.verified ? <span className="verified">Verified</span> : ""}</p>

						<p><strong>Created At:</strong> {relativeTime}</p>
						<p><strong>Role:</strong> {this.state.profileData.role}</p>

						<br/>
						<br/>
						{this.state.profileData.posts.map((post)=> (
							<div className="row" key={post._id}>
								<Post title={post.title} body={post.body} author={post.author} createdAt={post.createdAt} commentNumber={13} likesNumber={72} liked={false} verifiedPost={post.verifiedUser} slug={post._id}/>
							</div>
						))}
					</div>
				</div>
			);
		}
	}

}