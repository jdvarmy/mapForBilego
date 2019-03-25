import React, { Component } from 'react';
import './App.css';
import Chooser from './components/Chooser'

class App extends Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
              <Chooser />
          </header>
        </div>
    );
  }
}

export default App;