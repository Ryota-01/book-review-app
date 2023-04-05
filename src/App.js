import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route
          exact path="/"
          element={<Home />}
        />

        <Route 
          exact path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>}
        />

        <Route
          exact path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>}
        />

        <Route 
          exact path="/signup"
          element={<PublicRoute><Signup /></PublicRoute>}
        />


        
      </Routes>
    </div>
  );
}

export default App;
