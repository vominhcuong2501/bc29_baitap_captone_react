import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./header.scss";
import { USER_INFO_KEY } from "../../constans/common";
import { setUserAction } from "../../store/actions/user.action";
import {getInfomationApi} from "../../services/user"

export default function Header() {
  // gửi thông tin
  const dispatch = useDispatch();

  // chuyển trang
  const navigate = useNavigate();

  // lấy dữ liệu từ reducer
  const { userInfo } = useSelector((state) => state.userReducer);

  // đặt state
  const [infoUser, setInfoUser] = useState()

  // btn đăng xuất
  const handleLogout = () => {
    localStorage.removeItem(USER_INFO_KEY);
    dispatch(setUserAction(null));
    navigate("/");
  };

  return (
    <div className="header container-md container p-0">
      <nav className="navbar navbar-expand-md row p-0">
        <div className="col-3 navbar navbar-expand-md">
          <NavLink className="navbar-brand mx-auto" to="/">
            <img
              src={require("./logo3.png")}
              alt="logo"
              width={200}
              height={70}
            />
          </NavLink>
        </div>
        <button
          className="navbar-toggler d-lg-none text-light p-0 mr-5"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-light">
            <i className="fa-solid fa-bars"></i>
          </span>
        </button>
        <div
          className="col-9 collapse navbar-collapse p-0 mx-auto"
          id="collapsibleNavId"
        >
          <ul
            className="d-flex mb-0 text-light ml-auto p-0"
            style={{ listStyle: "none", alignItems: "center" }}
          >
            <li className="nav-item">
              <NavLink className="nav-link px-lg-4 px-2" to="/">
                TRANG CHỦ
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link px-lg-4 px-2" to="/movie">
                PHIM
              </NavLink>
            </li>
            {/* <li className="nav-item ">
              <NavLink className="nav-link px-lg-4 px-2" to="/cum-rap">
                LỊCH CHIẾU
              </NavLink>
            </li> */}
            <li className="nav-item ">
              <NavLink className="nav-link px-lg-4 px-2" to="/cum-rap">
                CỤM RẠP
              </NavLink>
            </li>
            <li className="nav-item ">
              {!userInfo ? (
                <div className="d-flex">
                  <NavLink className="nav-link px-lg-4 p" to="/login">
                    <i className="fa-solid fa-circle-user pr-2"></i>
                    ĐĂNG NHẬP
                  </NavLink>
                  <NavLink className="nav-link px-lg-4 p" to="/register">
                    <i className="fa-solid fa-user-plus pr-2"></i>
                    ĐĂNG KÝ
                  </NavLink>
                </div>
              ) : (
                <div className="d-flex">
                  <NavLink
                    to="/profile"
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: "aqua",
                      textDecoration: "none",
                    }}
                  >
                    <span className="mr-2 text-bottom" title="Trang cá nhân" >
                      Hello ! {userInfo.hoTen}
                    </span>
                  </NavLink>
                  <NavLink className="nav-link p-0" to="/register">
                    <i
                      title="Đăng xuất"
                      onClick={handleLogout}
                      className="fa-solid fa-right-from-bracket mt-1 log-out"
                    ></i>
                  </NavLink>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
      ;
    </div>
  );
}
