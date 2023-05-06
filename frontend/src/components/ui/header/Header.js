import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import { processEntity } from '../../../api/api';
import logo from './Logo6.jpg';
import MenuItem from '../menu-item/MenuItem.js';
import Search from './search/Search';

export default function Header() {
  const avatarRef = useRef();
  const [username, setUsername] = useState('User');

  useEffect(() => {
    processEntity('GET', `/user/you/avatar`)
      .then(response => response.json())
      .then(avatar => avatarRef.current.src = avatar)
      .catch(error => console.error(error))
  }, []);

  useEffect(() => {
    processEntity('GET', `/user/you`)
      .then(response => response.json())
      .then(user => setUsername(user.username || 'User'))
      .catch(error => console.log(error))
  }, []);
  
  return (
      <header className='header'>
        <nav className='header__left'>
          <div className='header__logo'>
            <img src={logo} height='60px' alt='Logo'/>
            <div className='header__logo-name'>Map<span className='header__logo-name-tail'>ex</span></div>
          </div>
          <ul className='header__left-nav'>
            <li>
              <MenuItem to="/" label="Home" />
            </li>
            <li>
              <MenuItem to="/library" label="Library"/>
            </li>
          </ul>
        </nav>
        <Search />
        <div className='header__right'>
          <div className='header__user-nav'>
            <div className='header__user-name'>
              <Link to="/user/you">{username}</Link>
            </div>
            <div className='header__user-avatar'>
              <img className='header__user-avatar-img' ref={avatarRef} />
            </div>
          </div>
        </div>
      </header>
  );
}
