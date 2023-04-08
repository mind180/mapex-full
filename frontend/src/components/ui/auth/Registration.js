import React from "react";
import RegistrationForm from "./RegistrationForm";
import AuthContent from "./AuthContent";

export default function Registration() {
    return (
        <div className="auth">
            <RegistrationForm />
            <AuthContent />
        </div>
    )
}