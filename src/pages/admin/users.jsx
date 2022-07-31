import React, { useEffect, useState } from "react";
import { fetchUserListApi } from "../../services/user";

export default function Users() {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    fetchUserList();
  }, []);
  const fetchUserList = async () => {
    const result = await fetchUserListApi();
    setUserList(result.data.content);
  };

  const renderContent = () => {
    return userList?.map((ele) => {
      return (
        <tr key={ele.taiKhoan}>
          <td>{ele.taiKhoan}</td>
          <td>{ele.hoTen}</td>
          <td>{ele.email}</td>
          <td>{ele.soDT}</td>
          <td>{ele.maLoaiNguoiDung}</td>
          <td>
            <button className="btn btn-warning mr-1">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button className="btn btn-danger">
              <i className="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="mx-5">
      <h2>Quản lý người dùng</h2>
      <div className="row my-3">
        <div className="col-6">
          <input
            className="form-control w-50 mr-sm-2"
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-primary">Thêm người dùng</button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Tài khoản</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Loại </th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderContent()}</tbody>
      </table>
    </div>
  );
}
