import React from 'react';
import logo from './logo.svg';
import './App.css';
import {HelloW} from './components/test'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HelloW />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
