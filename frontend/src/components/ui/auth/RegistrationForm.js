import React, { useState, useRef } from "react";
import './Auth.css';
import { setCookie, AUTH_TOKEN_NAME } from "../../../api/cookie";

const EMAIL_ERROR_MSG = 'Incorrect email';
const PASSWORD_ERROR_MSG = 'Password must be at least 8 characters long and contain uppercase and lowercase letters and numbers';
const PASSWORDS_MATCH_ERROR = 'Passwords do not match';

async function handleResponse(response) {
    if (response.ok) {
      return await response.json();
    }
    const error = await response.json();
    return await Promise.reject(error);
}

export default function RegistrationForm() {
    const [email, setEmail] = useState('');
    const emailRef = useRef(null);
    const [password, setPassword] = useState('');
    const passwordRef = useRef(null);
    const [passwordMatch, setPasswordMatch] = useState('');
    const [error, setError] = useState('');

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        const errorMsg = getValidationError();
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        const registerationData = { email, password };
        console.log(registerationData);
        await fetch('/auth/registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerationData)
          })
          .then(res => handleResponse(res))
          .then(token => setCookie(AUTH_TOKEN_NAME))
          .then(() => window.location.href = '/')
          .catch(err => {
            setError(err.message);
            console.error(err.error);
        })
    }

    const getValidationError = () => {
        if (!emailRef.current.validity.valid) return EMAIL_ERROR_MSG;
        if (!passwordRef.current.validity.valid) return PASSWORD_ERROR_MSG;
        if (password !== passwordMatch) return PASSWORDS_MATCH_ERROR;
        return null;
    }

    const handleSignIn = () => {
        window.location.href = '/login';
    }

    return (
        <div className="auth-block">
            <div className="login-left-content">
                <h2>Create account</h2>
                <div className="auth-welcome-msg">Access journeys by creating an account</div>
                <form className="auth-form">
                    <div className="login-forms-fieldset">
                        <div className="auth-form-field ">
                            <label>E-mail</label>
                            <input type="email" required ref={emailRef} 
                                                onChange={(e)=>setEmail(e.target.value)}
                                                onFocus={()=>setError('')}>
                            </input>
                        </div>
                        <div className="auth-form-field">
                            <label>Password</label>
                            <input type="password" required ref={passwordRef} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                                   onFocus={()=>setError('')} 
                                                   onChange={(e)=>setPassword(e.target.value)}>
                            </input>
                        </div>
                        <div className="auth-form-field">
                            <label>Repeat password</label>
                            <input type="password" required
                                                   onFocus={()=>setError('')} 
                                                   onChange={(e)=>setPasswordMatch(e.target.value)}>
                            </input>
                        </div>
                    </div>
                    <button className="auth-btn" onClick={handleCreateAccount}>Create account</button>
                    <div className="error-msg">{ error }</div>
                </form>
                <div className="signup-link">
                    Already have an account? <span className="signup-btn" onClick={handleSignIn}>Sign in</span>
                </div>
            </div>
        </div>
    )
}