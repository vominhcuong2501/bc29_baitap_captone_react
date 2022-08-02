import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { notification } from "antd";
// khi chưa login thì chuyển vào trang login, nếu rồi sẽ vào trang
export default function AdminGuard() {
  const { userInfo } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo && userInfo.maLoaiNguoiDung !== "QuanTri") {
        notification.warning({
            message: 'Khách hàng không thể vào trang admin !'
        })
        return navigate('/')
    }
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
}
