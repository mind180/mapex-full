import React from 'react';
import './App.css';
import Header from './components/ui/header/Header.js';
import CanvasStateProvider from './components/wrappers/CanvasStateProvider.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProfileHeader from './components/ui/profile-header/ProfileHeader.js';
import Dashboard from "./components/ui/dashboard/Dashboard";
import Board from "./components/ui/board/Board";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/library">
            <Dashboard />
          </Route>
          <Route path="/canvas/:canvasId">
            <Board/>
          </Route>
          <Route path="/user/:userId">
            <ProfileHeader />
            <Dashboard />
          </Route>
          <Route path="/">
            <CanvasStateProvider canvasId='63e63d7fd378b82384267d88'/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
