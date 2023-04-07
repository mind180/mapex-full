import React, { useState, useEffect } from "react";
import { setCookie, getCookie } from '../../../api/cookie';

async function handleResponse(response) {
    if (response.ok) {
      return await response.json();
    }
    const error = await response.json();
    return await Promise.reject(error);
}

export default function LoginLeft() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleLogin = async (e) => {
        e.preventDefault()
        const loginData = { email, password };
        
        await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
          })
          .then(res => handleResponse(res))
          .then(token => setCookie('mpx_user', token, 1))
          .then(() => window.location.href = '/')
          .catch(err => setError(err.message))
    }

    return <div className="login-left">
        <div className="login-left-content">
            <h2>Log in</h2>
            <div className="login-welcome-msg">Welcome to Mapex, , please log in to start using this app</div>
            <form className="login-form">
                <div className="login-forms-fieldset">
                    <div className="login-form-field">
                        <label>E-mail</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className="login-form-field">
                        <label>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                </div>
                <div className="forgot-password">Forgot password?</div>
                <button className="login-btn" onClick={handleLogin}>Log in</button>
                <div className="error-msg">{ error }</div>
            </form>
            <div className="signup-link">
                Don't have an account? <span className="signup-btn">Sign up</span>
            </div>
        </div>
    </div>
}