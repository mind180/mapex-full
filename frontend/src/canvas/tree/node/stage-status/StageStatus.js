import React, { useState } from "react";
import './StageStatus.css';

const statusItems = {
	'InProgress': <div className="current-status status-passing">⇒</div>,
	'Done': <div className="current-status status-done">✔</div>,
	'Canceled': <div className="current-status status-canceled">✖</div>
}

export default function StageStatus(props) {
	return (
		<div className="stage-status">
			{ statusItems[props.status] || null }
		</div>
	)
}