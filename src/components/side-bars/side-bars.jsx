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
              <NavLink className="nav-link" to="/admin/users">
              <i className="fa-solid fa-user"></i> Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/films">
              <i className="fa-solid fa-film "></i> Films
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/show-times">
              <i className="fa-solid fa-calendar-days"></i> Show-times
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
