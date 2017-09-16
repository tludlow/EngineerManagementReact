import React, {Component} from 'react';
import axios from "axios";

import Navbar from "../components/navbar/Navbar";
import Post from "../components/post/Post";

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			allPost: [],
			message: ""
		};
	}

	componentDidMount() {
		axios.get("http://localhost:7770/storie/getStories").then((response)=> {
			if(response.data.error) {
				this.setState({message: response.data.error});
				return;
			}
			this.setState({allPost: response.data.docs});
		}).catch((err)=> {
			this.setState({message: "There was an error loading your posts."});
		});
	}	

	render() {
		if(this.state.message) {
			return (
				<div className="homepage">
					<Navbar/>
					<div className="home container">
						<h3>{this.state.message}</h3>
					</div>
				</div>
			);
		}
		if(this.state.allPost.length < 1) {
			return (
				<div className="homepage">
					<Navbar/>
					<div className="home container">
						<h3>Loading posts...</h3>

						<div className="row">
							<Post noAnimate={true} title={"Loading Posts"} body={"They should be loaded any second now..."} author={"MrLoader"} createdAt={new Date()} commentNumber={13} likesNumber={72} liked={false}/>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div className="homepage">
				<Navbar/>
				<div className="home container">
					<h3>Welcome to your homepage.</h3>
					<br/>
					{this.state.allPost.map((post, i)=> (
						<div className="row" key={i}>
							<Post title={post.title} body={post.body} author={post.author} createdAt={post.createdAt} commentNumber={13} likesNumber={72} liked={false} verifiedPost={post.verifiedUser} slug={post._id} staffPicked={post.staffPicked}/>
						</div>
					))}
				</div>
			</div>
		);
	}

}
