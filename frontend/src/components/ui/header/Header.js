import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import logo from './Logo2.png';
import MenuItem from '../menu-item/MenuItem.js';

export default function Header() {
  return (
      <header className='header'>
        <nav className='header__left'>
          <div className='header__logo'><img src={logo} height='60px' alt='Logo'/></div>
          <ul className='header__left-nav'>
            <li className='br-1'>
              <MenuItem to="/" label="Home" />
            </li>
            <li className='br-1'>
              <MenuItem to="/library" label="Library"/>
            </li>
          </ul>
        </nav>
        <div className='header__right'>
          <div className='header__user-nav'>
            <div className='header__user-name'>
              <Link to="user/you">Username</Link>
            </div>
            <div className='header__user-avatar mock-avatar'></div>
          </div>
        </div>
      </header>
  );
}
