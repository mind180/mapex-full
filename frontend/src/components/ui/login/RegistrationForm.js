import React, { useState, useRef } from "react";
import './Login.css';
import { setCookie } from "../../../api/cookie";

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
          .then(() => window.location.href = '/login')
          .catch(err => {
            setError(err.message);
            console.log(err.error);
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
        <div className="login-left">
            <div className="login-left-content">
                <h2>Create account</h2>
                <div className="login-welcome-msg">Access journeys by creating an account</div>
                <form className="login-form">
                    <div className="login-forms-fieldset">
                        <div className="login-form-field ">
                            <label>E-mail</label>
                            <input type="email" required ref={emailRef} 
                                                onChange={(e)=>setEmail(e.target.value)}
                                                onFocus={()=>setError('')}>
                            </input>
                        </div>
                        <div className="login-form-field">
                            <label>Password</label>
                            <input type="password" required ref={passwordRef} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                                   onFocus={()=>setError('')} 
                                                   onChange={(e)=>setPassword(e.target.value)}>
                            </input>
                        </div>
                        <div className="login-form-field">
                            <label>Repeat password</label>
                            <input type="password" required
                                                   onFocus={()=>setError('')} 
                                                   onChange={(e)=>setPasswordMatch(e.target.value)}>
                            </input>
                        </div>
                    </div>
                    <button className="login-btn" onClick={handleCreateAccount}>Create account</button>
                    <div className="error-msg">{ error }</div>
                </form>
                <div className="signup-link">
                    Already have an account? <span className="signup-btn" onClick={handleSignIn}>Sign in</span>
                </div>
            </div>
        </div>
    )
}