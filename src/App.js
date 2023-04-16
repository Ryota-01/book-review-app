import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Home from './components/Home';
import Profile from './components/Profile';
import New from './components/New';
import Detail from './components/Detail';
import Edit from './components/Edit';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  const user = useSelector((state) => state.user.isSignIn)
  const [cookies] = useCookies('')
  const axiosInstance = axios.create({
    baseURL :  'https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/',
    headers : {
      'Authorization': `Bearer ${cookies.token}`
    }
  })

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
          path="/home"
          element={
            <Home
              cookies={cookies}
              axiosInstance={axiosInstance}
            />
          }
        />

        <Route 
          path="/profile"
          element={
            <PrivateRoute user={user}>
              <Profile
                axiosInstance={axiosInstance} 
                cookies={cookies}
              />
            </PrivateRoute>}
        />

        <Route 
          path="/new"
          element={
            <PrivateRoute user={user}>
              <New axiosInstance={axiosInstance} />
            </PrivateRoute>}
        />

        <Route 
          path="/detail/:id"
          element={
            <PrivateRoute user={user}>
              <Detail
                cookies={cookies}
                user={user}
                axiosInstance={axiosInstance}
              />
            </PrivateRoute>}
        />

        <Route 
          path="/edit/:id"
          element={
            <PrivateRoute user={user}>
              <Edit
                cookies={cookies}
                user={user}
                axiosInstance={axiosInstance}
              />
            </PrivateRoute>}
        />

        <Route
          path="/login"
          element={
            <PublicRoute user={user}>
              <Login axiosInstance={axiosInstance} />
            </PublicRoute>}
        />

        <Route 
          path="/signup"
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
