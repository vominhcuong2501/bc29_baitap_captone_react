import React from "react";
import { NavLink } from "react-router-dom";
import "./header.scss";

export default function header() {
  return (
    <div className="header container">
      <nav className="navbar navbar-expand-sm bg-dark">
        <a className="navbar-brand" href="#">
          CyberFilm
        </a>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="ml-auto" id="collapsibleNavId">
          <ul
            className="d-flex mb-0 text-light"
            style={{ listStyle: "none", alignItems: "center" }}
          >
            <li className="nav-item w-20">
              <NavLink className="nav-link" to="/">
                TRANG CHỦ
              </NavLink>
            </li>
            <li className="nav-item  w-20">
              <NavLink className="nav-link" to="/movie">
                PHIM
              </NavLink>
            </li>
            <li className="nav-item  w-20">
              <a className="nav-link" href="#">
                LỊCH CHIẾU
              </a>
            </li>
            <li className="nav-item  w-20">
              <a className="nav-link" href="#">
                CỤM RẠP
              </a>
            </li>

            <li className=" w-20" >
              <NavLink  to="/login">
                <button className="btn btn-outline-light my-2 my-sm-0">
                  <i
                    className="fa-solid fa-circle-user pr-2"
                    style={{ fontSize: 20 }}
                  ></i>
                  ĐĂNG NHẬP
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
