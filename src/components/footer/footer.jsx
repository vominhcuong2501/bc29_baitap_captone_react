import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./footer.scss";
export default function Footer() {
  return (
    <div className="text-light container-fluid footer">
      <div className=" pt-5 px-5 row">
        <div className="col-12 col-md-6 col-lg-3 mt-3">
          <NavLink className="navbar-brand mx-auto" to="/">
            <img
              src={require("./logo3.png")}
              alt="logo"
              width={200}
              height={70}
            />
          </NavLink>
          <p className="mt-3">
            <b className="text-warning" style={{fontSize: '30px'}}>D</b>ISNEY giúp bạn mua vé trực tuyến và cập nhật thường xuyên các
            thông tin như trailer, tin tức, thong tin rạp, suất chiếu, các đánh
            giá phim và các khuyến mãi dành cho người sử dụng
          </p>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mt-3">
          <h4 className="mb-4 chungtoi">Về chúng tôi</h4>
          <ul>
            <li>
              <a href="#">Giới thiệu</a>
            </li>
            <li>
              <a href="#">Lịch chiếu</a>
            </li>
            <li>
              <a href="#">Cụm rạp</a>
            </li>
            <li>
              <a href="#">Tin tức</a>
            </li>
            <li>
              <Link to="/login">Đăng nhập</Link>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mt-3">
          <h4 className="mb-4 hotro">Hỗ trợ khách hàng</h4>
          <ul>
            <li>
              <a href="#">Trung tâm hỗ trợ</a>
            </li>
            <li>
              <a href="#">Chính sách bảo mật</a>
            </li>
            <li>
              <a href="#">Quy chế hoạt động</a>
            </li>
            <li>
              <a href="#">Quyền lợi thành viên</a>
            </li>
            <li>
              <a href="#">Câu hỏi thường gặp</a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mt-3">
          <h4 className="mb-4 doitac">Đối tác</h4>
          <div className="footer-img">
            <img src={require("./BHD.png")} alt="BHD" width={50} height={50} />
            <img src={require("./CGV.png")} alt="CGV" width={50} height={50} />
            <img
              src={require("./LOTTE.png")}
              alt="LOTTE"
              width={50}
              height={50}
            />
            <img
              src={require("./MEGA.png")}
              alt="MEGA"
              width={50}
              height={50}
            />
            <img
              src={require("./GALAXY.png")}
              alt="GALAXY"
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <p style={{ fontSize: 30, color: " rgb(253, 194, 33)" }}>
          @VMC _ BC29_CAPTONE_REACT_JS
        </p>
      </div>
    </div>
  );
}
