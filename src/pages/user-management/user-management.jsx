import React, { useEffect, useState } from "react";
import { fetchUserListApi } from "../../services/user";

export default function UserManagement() {
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
    <div className="bg-light px-5 py-3" style={{borderRadius: '20px'}}>
      <h2 style={{color: '#007bff'}}>Quản lý người dùng</h2>
      <div className="row my-3">
        <div className="col-6">
          <input
            className="form-control w-50 mr-sm-2"
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="col-6 text-right">
        <button className="btn btn-primary" data-toggle="modal"
									data-target="#myModal1">Thêm người dùng</button>
        </div>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr style={{color: '#007bff', fontSize: 20}}>
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
      <div className="modal fade" id="myModal1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modal-title">
                Thêm người dùng
              </h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form role="form">
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                      <i className="fa-solid fa-user"></i> 
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control input-sm"
                      placeholder="Tài khoản"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-address-book" />
                      </span>
                    </div>
                    <input
                      type="name"
                      className="form-control input-sm"
                      placeholder="Họ và tên"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-envelope" />
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control input-sm"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-key" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mật khẩu"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                      <i className="fa-solid fa-phone"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Số điện thoại"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-briefcase" />
                      </span>
                    </div>
                    <select className="form-control">
                      <option>Chọn loại người dùng</option>
                      <option>Quản trị</option>
                      <option>Khách hàng</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer" id="modal-footer">
              <button type="button" className="btn btn-success">
                Thêm 
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
