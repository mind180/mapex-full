import React, { useState, useEffect, useRef} from "react";
import './ProfileAvatar.css';
import {processEntity} from "../../../../api/api";

export default function ProfileAvatar(props) {
	const avatarRef = useRef();

	useEffect(() => {
    processEntity('GET', `/user/you/avatar`)
      .then(res => res.json())
      .then(avatar => avatarRef.current.src = avatar)
      .catch(error => console.error(error));
  }, []);

	const uploadAvatar = (e) => {
    e.preventDefault()
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
			sendToServer(e.target.result);
    };
  }

	const sendToServer = (avatar) => {
    processEntity('POST', `/user/you/avatar`, avatar, 'application/octet-stream')
    	.then(res => res.json())
      .then(res => avatarRef.current.src = avatar)
      .catch(error => console.error(error));
	}

	return (
		<div className="profile-header__avatar">
			<img className='profile-header__avatar-img' ref={avatarRef} />
			<input className='avatar-upload' type="file" accept='image/*' onChange={uploadAvatar} />
		</div>
	)
}