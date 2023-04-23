import React from "react";
import './AddComment.css';

export default function AddComment(props) {


	return (
		<div className="add-comment">
			<main className="add-comment-body">
				<div className="add-comment-avatar"></div>
				<textarea className="add-comment-field" ></textarea>
			</main>
			<footer className="add-comment-footer">
				<input className="add-comment-button" type="button" value='Add comment' />
			</footer>
		</div>
	)
}