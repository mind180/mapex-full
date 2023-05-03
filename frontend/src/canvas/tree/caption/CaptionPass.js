import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Caption.css';

export default function CaptionPass(props) {
	const history = useHistory();

	const toLibrary = () => {
		history.push(`/library`);
	}

	const save = () => {
		history.push(`/map/${props.mapId}/edit`);
	}

  return (
		<div className='canvas-header-container'>
			<header className='canvas-header'>
				<div className='header-about'>
					<div className='header-title'>{props.title || 'Title'}</div>
					<div className='header-description'>{props.description || 'Some description'}</div>
				</div>
				<div className='header-actions'>
					<input className='header-nav-button' type='button' value='← Library' onClick={toLibrary} />
					<input className='header-nav-button' type='button' value='✎ Edit' onClick={save} />
				</div>
			</header>
		</div>
  );
}
