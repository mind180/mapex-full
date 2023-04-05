import React from "react";

export default function LoginLeft(props) {
    return <div className="login-left">
        <div className="login-left-content">
            <h2>Log in</h2>
            <div className="login-welcome-msg">Welcome to Mapex, , please log in to start using this app</div>
            <form className="login-form">
                <div className="login-forms-fieldset">
                    <div className="login-form-field">
                        <label>E-mail</label>
                        <input type="email"></input>
                    </div>
                    <div className="login-form-field">
                        <label>Password</label>
                        <input type="password"></input>
                    </div>
                </div>
                <div className="forgot-password">Forgot password?</div>
                <button className="login-btn">Log in</button>
            </form>
            <div className="signup-link">
                Don't have an account? <span className="signup-btn">Sign up</span>
            </div>
        </div>
    </div>
}