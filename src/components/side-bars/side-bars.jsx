import React from "react";
import { NavLink } from "react-router-dom";
import './sideBar.scss'

export default function SideBar() {
  return (
    <div className="side-bar">
      <nav >
        <div>
          <ul className="p-0" style={{listStyle: 'none'}}>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/movie-management">
              <i className="fa-solid fa-user"></i> Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/user-management">
              <i className="fa-solid fa-film "></i> Users
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
