import React from "react";
import LoginForm from "./LoginForm";
import LoginRight from "./LoginRight";
import './Login.css';

//center left and right content
export default function Login(props) {
    return <div className="login">
        <LoginForm />
        <LoginRight />
    </div>
}