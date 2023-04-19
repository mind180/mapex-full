import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import Header from './components/ui/header/Header.js';
import CanvasStateProvider from './components/wrappers/CanvasStateProvider.js';
import ProfileHeader from './components/ui/profile-header/ProfileHeader.js';
import Dashboard from "./components/ui/dashboard/Dashboard";
import Board from "./components/ui/board/Board";
import Login from "./components/ui/auth/Login";
import ProtectedRout from './components/wrappers/ProtectedRoute';
import Registration from './components/ui/auth/Registration';
import Suggestions from './components/ui/suggestions/Suggestions';
import { getCookie, AUTH_TOKEN_NAME } from './api/cookie';

//TO DO: fix getCookie multipule invokation
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/registration'>
            <Registration />
          </Route>
          <Route path="/library">
              <ProtectedRout isAuthenticated={getCookie(AUTH_TOKEN_NAME)}>
                <Header />
                <Dashboard />
              </ProtectedRout>
          </Route>
          <Route path="/canvas/:canvasId">
            <ProtectedRout isAuthenticated={getCookie(AUTH_TOKEN_NAME)}>
              <Header />
              <Board/>
            </ProtectedRout>
          </Route>
          <Route path="/user/:userId">
            <ProtectedRout isAuthenticated={getCookie(AUTH_TOKEN_NAME)}>
              <Header />
              <ProfileHeader />
              <Dashboard />
            </ProtectedRout>
          </Route>
          <Route path="/">
            <ProtectedRout isAuthenticated={getCookie(AUTH_TOKEN_NAME)}>
              <Header />
              <Suggestions />
            </ProtectedRout>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
