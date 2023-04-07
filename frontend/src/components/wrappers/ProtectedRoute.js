import React from "react";
import { Redirect } from "react-router-dom";

export default function ProtectedRout(props) {
    if (props.isAuthenticated) {
        return props.children;
    } else {
        return <Redirect to='/login' />
    }
}