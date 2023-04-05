import React from "react";
import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";
import './Login.css';

//center left and right content
export default function Login(props) {
    return <div className="login">
        <LoginLeft />
        <LoginRight />
    </div>
}