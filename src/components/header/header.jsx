import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./header.scss";
import { USER_INFO_KEY } from "../../constans/common";
import { setUserAction } from "../../store/actions/user.action";


export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userReducer);

  const handleLogout = () => {
    localStorage.removeItem(USER_INFO_KEY);
    dispatch(setUserAction(null));
    navigate("/");
  };

  return (
    <div className="header container">
      <div className="row">
        <div className="col-4 navbar navbar-expand-sm bg-dark p-0">
          <NavLink className="navbar-brand" to="/">
            CyberFilm
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
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className="col-8 text-light p-0"
          id="collapsibleNavId"
          style={{
            textAlign: "right",
            alignSelf: "center",
          }}
        >
          {!userInfo ? (
            <NavLink to="/login">
              <button className="btn btn-outline-light my-2 my-sm-0">
                <i
                  className="fa-solid fa-circle-user pr-2"
                  style={{ fontSize: 20 }}
                ></i>
                ĐĂNG NHẬP
              </button>
            </NavLink>
          ) : (
            <>
              <span
                className="mr-2 text-bottom"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Hello ! {userInfo.hoTen}
              </span>
              <button onClick={handleLogout} className="btn btn-warning">
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12 navbar navbar-expand-sm bg-dark p-0">
          <div className="mx-auto" id="collapsibleNavId">
            <ul
              className="d-flex mb-0 text-light"
              style={{ listStyle: "none", alignItems: "center" }}
            >
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  TRANG CHỦ
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link" to="/movie">
                  PHIM
                </NavLink>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="#">
                  LỊCH CHIẾU
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="#">
                  CỤM RẠP
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
