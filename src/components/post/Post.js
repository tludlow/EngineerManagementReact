import React, { Component } from 'react';
import moment from "moment";
import { Link, browserHistory } from "react-router";

//This is a stateless component. It doesn't have the react component life cycle methods.
export default class Post extends Component {

	clickHandler(e) {
		browserHistory.push("/post/" + this.props.slug);
	}

	render() {
		var relativeTime = moment(this.props.createdAt).fromNow();
		var authorProfile = "/profile/" + this.props.author;
		const postSlug = "/post/" + this.props.slug;
		return (
			{/*We dont want the template post to have an animation on load as then it looks bad when it happens twice, only the actual posts should have the animation */},
			<div className={this.props.noAnimate ? "col-lg-12 post" : "col-lg-12 post animated bounceInUp"} onClick={(e)=> this.clickHandler(e)}>
				<div className="post-header">
					<div className="col-lg-10">
						<h3 className="post-title">{this.props.title} {this.props.staffPicked ? <span className="post-staff-picked"> - Staff Picked</span>: ""}</h3>
						<p className="post-information">Posted: <strong className="post-createdAt">{relativeTime}</strong>            by <Link to={authorProfile} className="post-author-link"><strong>{this.props.author}</strong></Link>{this.props.verifiedPost ? <span className="verified">Verified</span> : ""}</p>
					</div>
					<div className="row">
						<div className="col-lg-11">
							<p className="post-body">{this.props.body}</p>
						</div>
					</div>
					<hr/>
					<div className="row" style={{'paddingLeft': "15px"}}>
						<div className="col-lg-1 liked-button">
							<p><i className={this.props.liked ? "fa fa-heart liked" : "fa fa-heart"}></i> {this.props.likesNumber}</p>
						</div>
						<div className="col-lg-9">
							<p><i className="fa fa-comment"></i> {this.props.commentNumber}</p>
						</div>
						<div className="col-lg-2">
							<Link to={postSlug} className="post-read-more">Read more</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}