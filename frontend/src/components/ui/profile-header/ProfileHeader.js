import React, {useEffect, useState, useRef} from 'react';
import './ProfileHeader.css';
import ProfileAvatar from './ProfileAvatar/ProfileAvatar';
import {processEntity} from "../../../api/api";

export default function ProfileHeader() {
  const avatarRef = useRef();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const setUserInfo = (user) => {
    setUsername(user.username || 'User');
    setEmail(user.email);
  };

  useEffect(() => {
    processEntity('GET', `/user/you`)
      .then(res => res.json())
      .then(user => setUserInfo(user))
      .catch(error => console.log(error))
  }, []);

  const saveUsername = () => {
    processEntity('PUT', `/user/you`, { username })
      .catch(error => console.log(error));
  };

  return (
    <div className='profile-header'>
      <div className="profile-header__background">
        <div className="profile-header__content">
          <ProfileAvatar />
          <div className="profile-header__info">
            <div className="profile-header__info-content">
              <input className='profile-username' value={username} 
                onChange={e => setUsername(e.target.value)} 
                onBlur={saveUsername}  
              />
              <h4 className="profile-header__info-item">
                {email}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}