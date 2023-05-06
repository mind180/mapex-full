import React from "react";
import "./Auth.css";
import plan from './Plan2.png';

export default function AuthContent(props) {
    return <div className="auth-content">
        <div>
            <div>
                <div className="promo-img-block">
                    <img className="promo-img" src={plan} />
                </div>
            </div>
            <div className="auth-content-footer">
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