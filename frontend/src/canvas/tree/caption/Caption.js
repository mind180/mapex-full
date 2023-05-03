import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Caption.css';

export default function Caption(props) {
  const history = useHistory();

  const back = () => {
		history.push(`/map/${props.mapId}/passing`);
	}

	const save = () => {
		history.push(`/map/${props.mapId}/passing`);
	}

  return (
      <div className='canvas-header-container'>
        <header className='canvas-header'>
          <div className='header-about'>
            <div className='header-title'>{props.title || 'Title'}</div>
            <div className='header-description'>{props.description || 'Some description'}</div>
          </div>
          <div className='header-actions'>
            <input className='header-nav-button' type='button' value='← Back' onClick={back} />
            <input className='header-nav-button' type='button' value='🖫 Save' onClick={save}/>
          </div>
        </header>
      </div>
  );
}
