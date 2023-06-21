import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div><nav className="nav">
    <NavLink to="/">Actual Weather</NavLink>
    <NavLink to="/forecast">Forecast</NavLink>
    <NavLink to="/bycity">Weather by City</NavLink>
    <NavLink to="/bycityforecast">Forecast by City</NavLink>
    
    </nav></div>
  )
}

export default NavBar