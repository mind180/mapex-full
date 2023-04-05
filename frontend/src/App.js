import React from 'react';
import './App.css';
import Header from './components/ui/header/Header.js';
import CanvasStateProvider from './components/wrappers/CanvasStateProvider.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProfileHeader from './components/ui/profile-header/ProfileHeader.js';
import Dashboard from "./components/ui/dashboard/Dashboard";
import Board from "./components/ui/board/Board";
import Login from "./components/ui/login/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path="/library">
            <Header />
            <Dashboard />
          </Route>
          <Route path="/canvas/:canvasId">
            <Header />
            <Board/>
          </Route>
          <Route path="/user/:userId">
            <Header />
            <ProfileHeader />
            <Dashboard />
          </Route>
          <Route path="/">
            <Header />
            <CanvasStateProvider canvasId='641367d3e6e00f461f2135ea'/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
