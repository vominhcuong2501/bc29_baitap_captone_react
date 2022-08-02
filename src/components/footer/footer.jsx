import React from "react";
import './footer.scss'
export default function Footer() {
  return (
    <div className="text-light container-fluid">
      <div className="footer bg-dark pt-5 px-5 row">
        <div className="col-3">
          <h3 className="mb-4" style={{fontSize: 30, color: ' rgb(253, 194, 33)'}}><b><i>CyberFilm</i></b></h3>
          <span>
            CyberFilm giúp bạn mua vé trực tuyến và cập nhật thường xuyên các
            thông tin như trailer, tin tức, thong tin rạp, suất chiếu, các đánh
            giá phim và các khuyến mãi dành cho người sử dụng
          </span>
        </div>
        <div className="col-3">
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
              <a href="#">Đăng nhập</a>
            </li>
          </ul>
        </div>
        <div className="col-3">
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
        <div className="col-3">
          <h4 className="mb-4 doitac">Đối tác</h4>
          <div className="footer-img">
            <img src={require("./BHD.png")} alt="BHD" width={50} height={50} />
            <img src={require("./CGV.png")} alt="CGV" width={50} height={50} />
            <img src={require("./LOTTE.png")} alt="LOTTE" width={50} height={50} />
            <img src={require("./MEGA.png")} alt="MEGA" width={50} height={50} />
            <img src={require("./GALAXY.png")} alt="GALAXY" width={50} height={50} />
          </div>
        </div>
      </div>
      <div className="text-center mt-5" ><p style={{fontSize: 30, color: ' rgb(253, 194, 33)'}}>@Copyright _ BC29 Bài tập Captone React</p></div>
    </div>
  );
}
