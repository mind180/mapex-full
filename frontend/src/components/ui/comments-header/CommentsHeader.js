import React from "react";
import './CommentsHeader.css'

export default function CommentsHeader(props) {

	return (
		<div className='comments-header'>
			<div className='comments-header-block'>
				<h2 className='comments-header-title'>🗨️ Comments</h2>
				<h4 className='comments-count'>3 comments</h4>
			</div>
		</div>
	)
}