import React, {useEffect, useState} from 'react';
import './ProfileHeader.css'
import {useParams} from "react-router-dom";
import {processEntity} from "../../../api/api";

export default function ProfileHeader() {
  const { userId } = useParams();
  const [username, serUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');

  const setUserInfo = (user) => {
    serUsername(user.username);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setLocation(user.location);
  };

  useEffect(() => {
    processEntity('GET', `/user/${userId}`)
      .then(response => response.json())
      .then(user => setUserInfo(user))
      .catch(error => console.log(error))
  }, []);

  return (
    <div className='profile-header'>
      <div className="profile-header__background-image">
        <div className="profile-header__content">
          <div className="profile-header__avatar mock-avatar"></div>
          <div className="profile-header__info">
            <div className="profile-header__info-content">
              <h2 className="profile-header__info-item">
                {username}
              </h2>
              <h3 className="profile-header__info-item"
                  style={{display: (firstName ? 'block': 'none')}}
              >
                {firstName} {lastName}
              </h3>
              <h3 className="profile-header__info-item"
                  style={{display: (location ? 'block': 'none')}}
              >
                {location}
              </h3>
            </div>
            <div className="profile-header__edit-background">
              <input type="button" value='edit background'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}