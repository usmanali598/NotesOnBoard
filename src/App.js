import React, { Component } from 'react';
import speaker from './speaker.PNG';
import './App.css';
import Board from './components/Board';


class App extends Component
{
  render()
  {
    return (
      <div className="App">

        <img src={ speaker } className="App-logo" alt="notes" />

        <Board />
      </div>
    );
  }
}

export default App;
