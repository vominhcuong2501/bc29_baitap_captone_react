import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { MaLoaiNguoiDung } from "../../enums/common";
// khi chưa login thì chuyển vào trang login, nếu rồi sẽ vào trang
export default function AdminGuard() {
  const { userInfo } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    // nếu chưa đăng nhập tài khoản thì chuyển trang login
    if (!userInfo) {
      navigate("/login");
    }
    // nếu đã đăng nhập và tài khoản không phải là QuanTri thì ngăn vào trang admin chuyển về trang home
    if (userInfo && userInfo.maLoaiNguoiDung !== MaLoaiNguoiDung.QuanTri) {
      notification.warning({
        message: "Khách hàng không thể vào trang admin !",
      });
      return navigate("/");
    }
  }, []);
  
  return (
    <div>
      <Outlet />
    </div>
  );
}
