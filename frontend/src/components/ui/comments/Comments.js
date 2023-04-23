import React, { useState, useEffect } from 'react';
import './Comments.css';
import { processEntity } from '../../../api/api.js';
import CommentsHeader from '../comments-header/CommentsHeader';
import AddComment from '../add-comment/AddComment';
import Comment from '../comment/Comment';

export default function Comments(props) {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		processEntity('GET', `/maps/${props.mapId}/comments`)
			.then(res => res.json())
			.then(comments => {console.log(comments); setComments(comments) })
			.catch(err => console.error(err));
	}, []);

	return (
		<section className='comments-section'>
			<div className='comments-container'>
				<CommentsHeader />
				<AddComment />
				<Comment />
				<Comment />
			</div>
		</section>
	)
}