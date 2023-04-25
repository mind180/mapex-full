import React from "react";
import './Comment.css';

export default function Comment(props) {
	const handleLike = () => {
		alert('In progress ...');
	}

	const handleReply = () => {
		alert('In progress ...');
	}


	return (
		<div className="comment">
			<div className="comment-avatar"></div>
			<main className="comment-main">
				<div className="comment-main-header">
					<h4 className="comment-username">
						Username
					</h4>
					<div className="comment-date">
						{ props.commentData.date }
					</div>
				</div>
				<div className="comment-text">
					{ props.commentData.text }
				</div>
				<div className="comment-footer">
					<div className="comment-like" onClick={handleLike}>♡ 1</div>
					<div className="comment-reply" onClick={handleReply}>Reply</div>
					{ props.isMy ? (
						<div onClick={() => props.onDelete(props.commentData._id)} className="comment-delete">Delete</div>
					) : null
					}
				</div>
			</main>
		</div>
	)
}