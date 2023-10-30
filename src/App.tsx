import React from 'react';
import './App.css';
import Register from './pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SingleUser from './pages/SingleUser';
import UpdateUser from './pages/UpdateUser';
import Contact from './pages/Contact';
import About from './pages/About';
import Pricing from './pages/Pricing';
import MyProfile from './pages/MyProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Register}/>
        <Route path='/dashboard' Component={Dashboard}/>
        <Route path='/dashboard/users/:id' Component={Dashboard}/>
        <Route path='/profile' Component={MyProfile}/>
        <Route path='/pricing' Component={Pricing}/>
        <Route path='/about' Component={About}/>
        <Route path='/contact' Component={Contact}/>
        <Route path='/login' Component={Login}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
