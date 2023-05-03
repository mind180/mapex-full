import React from 'react';
import './Caption.css';

export default function CaptionView(props) {
  return (
      <div className='canvas-header-container'>
        <header className='canvas-header'>
          <div className='header-about'>
            <div className='header-title'>{props.title || 'Title'}</div>
            <div className='header-description'>{props.description || 'Some description'}</div>
          </div>
          <div className='header-actions'>
            <input className='header-nav-button' type='button' value='← Roadmaps' />
            <input className='header-nav-button' type='button' value='🖫 Save' />
          </div>
        </header>
      </div>
  );
}
