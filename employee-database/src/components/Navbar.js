import React from 'react'
import {NavLink} from 'react-router-dom'

const Navbar = ({setLoggedIn}) => {
  const handleLogout = async e => {
    const response = await fetch('/logout', {
      method: 'GET'
    })
    const data = await response.json()
    if(data.success){
      setLoggedIn(false)
    }
  }

    return (
      <div className="Header">
        <header>
          <NavLink to="/dashboard" className='header-item'>
            <h4>Flow</h4>
          </NavLink>
          <nav className='header-item'>
            <ul>
              <div>
                <a href="#nothing">
                  <li>Profile</li>
                </a>
              </div>
            </ul>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        </header>
      </div>
    );
}

export default Navbar