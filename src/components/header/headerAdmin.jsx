import React from "react";
import { NavLink } from "react-router-dom";

export default function HeaderAdmin() {
  return (
    <div className="text-center">
      <nav className="navbar navbar-expand-sm navbar-light row p-0">
        <div className="col-2" style={{ backgroundColor: "black" }}>
          <NavLink className="navbar-brand" to="/">
            <img src={require('./logo3.png')} alt="logo" width={200} height={70} />
          </NavLink>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </nav>
    </div>
  );
}
