import React from "react";
import './Comment.css';

export default function Comment(props) {

	return (
		<div className="comment">
			<div className="comment-avatar"></div>
			<main className="comment-main">
				<div className="comment-main-header">
					<h4 className="comment-username">
						Username
					</h4>
					<div className="comment-date">
						1 month ago
					</div>
				</div>
				<div className="comment-text">
					Шо ты блять нарисовал! Пиздец!
				</div>
				<div className="comment-footer">
					<div className="comment-like">♡ 1</div>
					<div className="comment-reply">Reply</div>
				</div>
			</main>
		</div>
	)
}