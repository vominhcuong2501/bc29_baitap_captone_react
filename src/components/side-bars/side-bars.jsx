import React from "react";
import { NavLink } from "react-router-dom";
import './sideBar.scss'

export default function SideBar() {
  return (
    <div className="side-bar">
      <nav >
        <div>
          <ul style={{listStyle: 'none'}}>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/users">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/films">
                Films
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/show-times">
                Show-times
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
