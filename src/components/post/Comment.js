import React from 'react';
import moment from "moment";
import { Link } from "react-router";

//This is a stateless component. It doesn't have the react component life cycle methods.
const Comment = (props) => {
	var relativeTime = moment(props.createdAt).fromNow();
	var authorProfile = "/profile/" + props.author;
	return(
        <div className="comment">
            <p>{props.commentText}</p>
        </div>
    );
}
export default Post;