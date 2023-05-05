import React, {useEffect, useState} from 'react';
import './ProfileHeader.css'
import {useParams} from "react-router-dom";
import {processEntity} from "../../../api/api";

export default function ProfileHeader() {
  const { userId } = useParams();
  const [username, serUsername] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');

  const setUserInfo = (user) => {
    console.log(user);
    serUsername(user.username);
    setEmail(user.email);
  };

  useEffect(() => {
    processEntity('GET', `/user/${userId}`)
      .then(response => response.json())
      .then(user => setUserInfo(user))
      .catch(error => console.log(error))
  }, []);

  const saveUsername = () => {
    processEntity('PUT', `/user/you`, { username })
      .then(response => response.json())
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };

  return (
    <div className='profile-header'>
      <div className="profile-header__background">
        <div className="profile-header__content">
          <div className="profile-header__avatar mock-avatar"></div>
          <div className="profile-header__info">
            <div className="profile-header__info-content">
              <input className='profile-username' value={username} 
                onChange={e => serUsername(e.target.value)} 
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