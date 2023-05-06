import React, { useEffect, useRef, useState } from "react";
import './AddComment.css';
import { processEntity } from "../../../api/api";

export default function AddComment(props) {
	const avatarRef = useRef();
	const inputRef = useRef();
	const [commentText, setCommentText] = useState('');

	useEffect(() => {
		processEntity('GET', `/user/you/avatar`)
		  .then(response => response.json())
		  .then(avatar => avatarRef.current.src = avatar)
		  .catch(error => console.error(error))
	}, []);

	const saveComment = () => {
		const comment = { text: commentText };

		processEntity('POST', `/maps/${props.mapId}/comment`, comment)
			.then(res => res.json())
			.then(newComment => props.onCommentAdd(newComment))
			.then(() => inputRef.current.value = '')
			.catch(e => console.error(e));
	}

	return (
		<div className="add-comment">
			<main className="add-comment-body">
				<div className="add-comment-avatar">
					<img className='add-comment-avatar-img' ref={avatarRef} />
				</div>
				<textarea ref={inputRef} className="add-comment-field" onChange={e => setCommentText(e.target.value)}></textarea>
			</main>
			<footer className="add-comment-footer">
				<input className="add-comment-button" type="button" onClick={saveComment} value='Add comment' />
			</footer>
		</div>
	)
}