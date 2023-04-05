import React from "react";
import "./Login.css";
import plan from './Plan.png';

//fix this stupid class names
export default function LoginRight(props) {
    return <div className="login-right">
        <div className="login-right-content">
            <div className="right-content-main">
                <div className="promo-img-block">
                    <img className="promo-img" src={plan} />
                </div>
            </div>
            <div className="right-content-footer">
                <h3 className="description-title">Build a plan</h3>
                <div className="description-text">
                    Build your path or take someone else's experience to achieve your goals
                </div>
                <div className="description-scroll">
                    <div className="prev"></div>
                    <div className="scroll-index">⦿ ○ ○</div>
                    <div className="next"></div>
                </div>
            </div>
        </div>
    </div>
}