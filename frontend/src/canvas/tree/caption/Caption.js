import React from 'react';
import './Caption.css';

export default function Caption(props) {
  return (
      <header className='canvas-header'>
        <div className='header-title'>{props.title || 'Title'}</div>
        <div className='header-description'>{props.description || 'Some description'}</div>
      </header>
  );
}
