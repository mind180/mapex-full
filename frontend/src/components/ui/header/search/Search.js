import React from 'react';
import './Search.css';

export default function Search() {
	return(
		<div className='header-search'>
			<div className='header-search-logo'>🔎︎</div>
			<input className='header-search-input' type='text' placeholder='Search' />
		</div>	
	)
}