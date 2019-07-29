import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import AppIndex from './components/AppIndex';

class App extends Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
              <AppIndex />
          </header>
        </div>
    );
  }
}

export default App;