import React, { useEffect, useRef } from "react";
import './Comment.css';
import { processEntity } from "../../../api/api";

export default function Comment(props) {
	const avatarRef = useRef();

	useEffect(() => {
		processEntity('GET', `/user/${props.commentData.user._id}/avatar`)
		  .then(response => response.json())
		  .then(avatar => avatarRef.current.src = avatar)
		  .catch(error => console.error(error))
	}, []);

	const handleLike = () => {
		alert('In progress ...');
	}

	const handleReply = () => {
		alert('In progress ...');
	}


	return (
		<div className="comment">
			<div className="comment-avatar">
				<img className='comment-avatar-img' ref={avatarRef} />
			</div>
			<main className="comment-main">
				<div className="comment-main-header">
					<h4 className="comment-username">
						{props.commentData.user.username}
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