import React from 'react'
import {NavLink} from 'react-router-dom'

const Sidebar = ({setLoggedIn, setCurrentUser, currentUser, handleToggle}) => {

    const handleLogout = async (e) => {
      const response = await fetch("/logout", {
        method: "GET",
      });
      const data = await response.json();
      if (data.success) {
        setCurrentUser('')
        setLoggedIn(false)
      }
    };

    return (
      <div className="side-bar">
          <div className='sidebar-header'>
            <h1 className='sidebar-welcome'>{`Hello, ${currentUser.replace(
              /@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
              ""
            )}`}
            </h1>
            <div className='sidebar-icon' onClick={handleToggle}>
              <i className="fas fa-times"></i>
            </div>
          </div>

        <nav>
          <NavLink to="/dashboard" className="nav-item">
            <h4 className="nav-item">Settings</h4>
          </NavLink>
          <NavLink to="/dashboard" className="nav-item">
            <h4 className="nav-item">Help</h4>
          </NavLink>
          <NavLink
            to="/dashboard"
            className="nav-logout"
            onClick={handleLogout}
          >
            <h4 className="nav-item logout">Logout</h4>
          </NavLink>
        </nav>
      </div>
    );
}

export default Sidebar