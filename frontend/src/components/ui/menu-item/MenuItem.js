import React from 'react';
import './ManyItem.css';
import { Link, useRouteMatch } from "react-router-dom";

export default function MenuItem({ label, to }) {
  let match = useRouteMatch(to);
  //TO DO fix
  const isActive = match?.isExact ? "active-link" : "";

  return (
      <p className={`menu-item ${isActive}`}>
        <Link to={to}>{label}</Link>
      </p>
  );
}