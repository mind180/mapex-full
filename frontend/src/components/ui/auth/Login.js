import React from "react";
import LoginForm from "./LoginForm";
import AuthContent from "./AuthContent";
import './Login.css';

//center left and right content
export default function Login(props) {
    return <div className="login">
        <LoginForm />
        <AuthContent />
    </div>
}