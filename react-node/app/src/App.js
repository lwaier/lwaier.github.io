import React from 'react';
import {HashRouter as Router,Route} from 'react-router-dom'

import './App.css';
import Layout from './scripts/views';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
          <Router>
              <Route component = {Layout}></Route>
          </Router>

      </header>
    </div>
  );
}

export default App;
