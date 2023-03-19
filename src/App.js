import React from 'react';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        
        <Route
          exact path="/login"
          element={<Login />}
        />

        <Route 
          exact path="/signup"
          element={<Signup />}
        />

        
      </Routes>
    </div>
  );
}

export default App;
