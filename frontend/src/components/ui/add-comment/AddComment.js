import React, { useState } from "react";
import './AddComment.css';
import { processEntity } from "../../../api/api";

export default function AddComment(props) {
	const [commentText, setCommentText] = useState('');

	const saveComment = () => {
		const comment = {
			text: commentText
		};

		processEntity('POST', `/maps/${props.mapId}/comment`, comment)
			.then(res => res.json())
			.then(newComment => props.onCommentAdd(newComment))
			.catch(e => console.error(e));
	}

	return (
		<div className="add-comment">
			<main className="add-comment-body">
				<div className="add-comment-avatar"></div>
				<textarea className="add-comment-field" onChange={e => setCommentText(e.target.value)}></textarea>
			</main>
			<footer className="add-comment-footer">
				<input className="add-comment-button" type="button" onClick={saveComment} value='Add comment' />
			</footer>
		</div>
	)
}