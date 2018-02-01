import React, { Component } from 'react';
import logo from './logo.svg';
import speaker from './speaker.PNG';
import './App.css';
import { Button } from 'reactstrap';
import Board from './components/Board';


class App extends Component
{
  render()
  {
    return (
      <div className="App">

        <img src={ speaker } className="App-logo" alt="logo" />

        <Board />
      </div>
    );
  }
}

export default App;
