import React from 'react'
import logo from '../images/react.png';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar/Navbar.css';

type NavbarProps = {

}

const Navbar = (props: NavbarProps) => {
  return (
    <div className='navbar'>
        <div className="navbar-inner">
            <div className="box">
                <img src={logo} alt="logo" className="logo" />
                <div className="nav-links">
                    <NavLink className="link" to='/dashboard'>Dashboard</NavLink>
                    <NavLink className="link" to='/profile'>My Profile</NavLink>
                    <NavLink className="link" to='/pricing'>Pricing</NavLink>
                    <NavLink className="link" to='/about'>About</NavLink>
                    <NavLink className="link" to='/contact'>Contact Us</NavLink>
                </div>
            </div>
            <form className='form'>
                <input className="input" type="text" placeholder='search'/>
                <button className='btn'>Search</button>
            </form>
        </div>
    </div>
  )
}

export default Navbar