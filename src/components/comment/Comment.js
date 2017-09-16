import React from "react";

const Comment = (props) => {
    return (
        <div className="comment">
            <h3>{props.author}</h3>
            <p>{props.body}</p>
        </div>
    );
}
  
export default Comment;