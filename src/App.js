import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import UserEdit from './components/UserEdit';
import PostReview from './components/PostReview';
import Review from './components/Review';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {

  const user = useSelector((state) => state.user.isSignIn)

  return (
    <div className="App">
      <Routes>
        <Route
          exact path="/"
          element={
            <PrivateRoute user={user}>
              <Home />
            </PrivateRoute>
          }
        />

        <Route 
          exact path="/home"
          element={
            <Home />
          }
        />

        <Route 
          exact path="/useredit"
          element={
            <PrivateRoute user={user}>
              <UserEdit />
            </PrivateRoute>}
        />

        <Route 
          exact path="/new"
          element={
            <PrivateRoute user={user}>
              <PostReview />
            </PrivateRoute>}
        />

        <Route 
          exact path="/review"
          element={
            <PrivateRoute user={user}>
              <Review />
            </PrivateRoute>}
        />

        <Route
          exact path="/login"
          element={
            <PublicRoute user={user}>
              <Login />
            </PublicRoute>}
        />

        <Route 
          exact path="/signup"
          element={
            <PublicRoute user={user}>
              <Signup />
            </PublicRoute>}
        />


        
      </Routes>
    </div>
  );
}

export default App;
