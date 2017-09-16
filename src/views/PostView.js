import React, { Component } from 'react';
import axios from "axios";
import moment from "moment";
import { Link } from "react-router";

import Navbar from "../components/navbar/Navbar";
import Comment from "../components/comment/Comment";
export default class PostView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            postData: {},
            error: "",
        };
    }

    componentDidMount() {
        //Load the data for this post.
        axios.get("http://localhost:7770/storie/getPost/" + this.props.params.postId).then((response)=> {
			if(response.data.error) {
                this.setState({isLoaded: true, error: response.data.error});
				return;
            }
            if(response.data.ok === false) {
                this.setState({isLoaded: true, error: response.data.error});
				return;
			}
            this.setState({isLoaded: true, postData: response.data.post, comments: response.data.comments});
		}).catch((err)=> {
            this.setState({isLoaded: true, error: "There was an error with the request."});
		});
    }

	render() {
        const postId = this.props.params.postId;
        var relativeTime = moment(this.state.postData.createdAt).fromNow();

        if(this.state.isLoaded === false) {
            return (
                <div className="post-view">
                    <Navbar />
                    <div className="container">
                        <h3>Loading post...</h3>
                    </div>
			    </div>
            );
        }

        if(this.state.error.length > 3) {
            return (
                <div className="post-view">
                    <Navbar />
                    <div className="container">
                        <h3>There was an error loading the post {postId}</h3>
                    </div>
                </div>
            );
        }

		return (
			<div className="post-view">
				<Navbar />
				<div className="container">
                    {this.state.postData.staffPicked ? <span className="staff-picked">Staff Picked</span> : ""}
					<h3><strong>{this.state.postData.title}</strong> - <Link to={"/profile/" + this.state.postData.author} className="post-author-link"><strong>{this.state.postData.author}</strong></Link>{this.state.postData.verifiedUser ? <span className="verified-post-view">Verified</span> : ""}</h3>
                    <p className="post-information-view">Posted: <strong>{relativeTime}</strong></p>
                    <p>{this.state.postData.body}</p>

                    <div className="comments">
                        {this.state.comments.map((comment, i)=> (
                            <div className="comment" key={i}>
                                <Comment author={comment.author} body={comment.body} />
                            </div>
                        ))}
                    </div>
				</div>
			</div>
		);
	}
}
