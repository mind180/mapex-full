import React, { useState, useEffect } from 'react';
import './Comments.css';
import { processEntity } from '../../../api/api.js';
import CommentsHeader from '../comments-header/CommentsHeader';
import AddComment from '../add-comment/AddComment';
import Comment from '../comment/Comment';

export default function Comments(props) {
	const [myComments, setMyComments] = useState([]);
	const [othersComments, setOthersComments] = useState([]);
	const [commentsCount, setCommentsCount] = useState(0);

	useEffect(() => {
		processEntity('GET', `/maps/${props.mapId}/comments`)
			.then(res => res.json())
			.then(comments => setComments(comments))
			.catch(err => console.error(err));
	}, []);

	const setComments = (comments) => {
		setMyComments(comments.my);
		setOthersComments(comments.others);
		setCommentsCount(comments.my.length + comments.others.length);
	}

	const handleAddComment = (newComment) => {
		setMyComments([newComment, ...myComments]);
		setCommentsCount(commentsCount + 1);
	}

	const handleDelete = (id) => {
		processEntity('DELETE', `/maps/${props.mapId}/comment/${id}`)
			.then(res => res.json())
			.then(comment => {
				deleteMyComment(id);
				setCommentsCount(commentsCount - 1);
			})
			.catch(err => console.error(err));
	}

	const deleteMyComment = (id) => {
		const commentToDeleteIndex = myComments.findIndex(comment => comment._id === id);
		myComments.splice(commentToDeleteIndex, 1);
		setMyComments([...myComments]);
	}

	return (
		<section className='comments-section'>
			<div className='comments-container'>
				<CommentsHeader count={commentsCount} />
				<AddComment onCommentAdd={handleAddComment} mapId={props.mapId} />
				{myComments.map((comment, index) => (
					<Comment key={index} isMy={true} commentData={comment} onDelete={handleDelete}/>
				))}
				{othersComments.map((comment, index) => (
					<Comment key={index} commentData={comment} />
				))}
			</div> 
		</section>
	)
}