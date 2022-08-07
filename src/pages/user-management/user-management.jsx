import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAddUserApi,
  fetchDeleteUserApi,
  fetchEditAdminApi,
  fetchInfomationApi,
  fetchSearchUserApi,
  fetchUserListApi,
} from "../../services/user";
let DEFAULT_VALUES = {
  taiKhoan: "",
  matKhau: "",
  email: "",
  soDT: "",
  maNhom: "",
  maLoaiNguoiDung: "",
  hoTen: "",
};
let DEFAULT_ERRROS = {
  taiKhoan: "",
  matKhau: "",
  email: "",
  soDT: "",
  maNhom: "",
  maLoaiNguoiDung: "",
  hoTen: "",
};

export default function UserManagement() {
  // chuyển trang
  const navigate = useNavigate();

  // đặt state render
  const [userList, setUserList] = useState([]);

  // đặt state nhập dữ liệu
  const [state, setState] = useState({
    values: DEFAULT_VALUES,
    errors: DEFAULT_ERRROS,
  });

  // load lần đầu dể lấy danh sách
  useEffect(() => {
    fetchUserList();
  }, []);

  // call api lấy danh sách
  const fetchUserList = async () => {
    const result = await fetchUserListApi();
    setUserList(result.data.content);
  };

  // check validate
  const formRef = useRef();

  // nhập dữ liệu
  const handleChange = (event) => {
    const {
      name,
      value,
      title,
      validity: { valueMissing, patternMismatch },
    } = event.target;
    let message = "";
    if (patternMismatch) {
      message = `${title} không đúng kiểu dữ liệu`;
    }
    if (valueMissing) {
      message = `${title} bị rỗng`;
    }

    setState({
      values: { ...state.values, [name]: value },
      errors: { ...state.errors, [name]: message },
    });
  };

  // đặt state cho user dc chọn
  const [selectedUser, setSelectedUser] = useState({ selected: "" });

  // setState khi thay đổi dữ liệu
  useEffect(() => {
    if (selectedUser.selected) {
      setState((state) => ({
        ...state,
        values: selectedUser.selected,
      }));
    }
  }, [selectedUser.selected]);

  // nhấn nút hiện thi thông tin cần sửa
  const handleSelectedUser = async (taiKhoan) => {
    const result = await fetchInfomationApi(taiKhoan)
    setSelectedUser({
      selected: result.data.content,
    });
    console.log(selectedUser.selected);
  };

  // ấn thêm người dùng
  const handleSubmit = async (event) => {
    event.preventDefault();
    // check validate
    if (!event.target.checkValidity()) {
      return;
    }
    try {
      if (selectedUser.selected) {
        // sửa thông tin người dùng
        await fetchEditAdminApi(state.values);
        alert("Cập nhật người dùng thành công !!!");
        document.getElementById("closeModal").click();
        navigate("/admin");
      } else {
        // thêm người dùng
        await fetchAddUserApi(state.values);
        alert("Thêm người dùng thành công !!!");
        document.getElementById("closeModal").click();
        navigate("/admin");
      }
    } catch (errors) {
      alert(errors.response.data.content);
    }
  };

  // xóa người dùng, taiKhoan đã đặt vé không xóa được
  const fetchDeleteUser = async (taiKhoan) => {
    try {
      await fetchDeleteUserApi(taiKhoan);
      alert("Bạn xóa người dùng thành công !!!");
      navigate("/admin");
    } catch (errors) {
      alert(errors.response.data.content);
    }
  };

  // render nội dung
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
            <button
              onClick={() => handleSelectedUser(ele.taiKhoan)}
              className="btn btn-warning mr-1"
              data-toggle="modal"
              data-target="#myModal1"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              onClick={() => fetchDeleteUser(ele.taiKhoan)}
              className="btn btn-danger"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  const { taiKhoan, hoTen, soDT, email, maLoaiNguoiDung, matKhau, maNhom } =
    state.values;

  return (
    <div className="container-fluid">
      <div className="bg-light px-5 py-3" style={{ borderRadius: "20px" }}>
        <h2 style={{ color: "#007bff" }}>Quản lý người dùng</h2>
        <div className="row my-3">
          <div className="col-6">
            <input
              className="form-control w-50 mr-sm-2"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="col-6 text-right">
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#myModal1"
            >
              Thêm người dùng
            </button>
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr style={{ color: "#007bff", fontSize: 20 }}>
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
                <form ref={formRef} noValidate onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-user"></i>
                        </span>
                      </div>
                      <input
                        required
                        type="text"
                        className="form-control input-sm"
                        placeholder="Tài khoản"
                        name="taiKhoan"
                        onChange={handleChange}
                        title="(*) Tài khoản"
                        value={taiKhoan}
                      />
                    </div>
                    {state.errors.taiKhoan && (
                      <span className="text-danger">
                        {state.errors.taiKhoan}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-address-book" />
                        </span>
                      </div>
                      <input
                        required
                        type="text"
                        className="form-control input-sm"
                        placeholder="Họ tên"
                        name="hoTen"
                        onChange={handleChange}
                        title="(*) Họ tên"
                        value={hoTen}
                      />
                    </div>
                    {state.errors.hoTen && (
                      <span className="text-danger">{state.errors.hoTen}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-envelope" />
                        </span>
                      </div>
                      <input
                        required
                        type="email"
                        className="form-control input-sm"
                        placeholder="Email"
                        pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                        name="email"
                        onChange={handleChange}
                        title="(*) Email"
                        value={email}
                      />
                    </div>
                    {state.errors.email && (
                      <span className="text-danger">{state.errors.email}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-key" />
                        </span>
                      </div>
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Mật khẩu"
                        name="matKhau"
                        onChange={handleChange}
                        title="(*) Mật khẩu"
                        value={matKhau}
                      />
                    </div>
                    {state.errors.matKhau && (
                      <span className="text-danger">
                        {state.errors.matKhau}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-phone"></i>
                        </span>
                      </div>
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Số điện thoại"
                        name="soDT"
                        onChange={handleChange}
                        title="(*) Số điện thoại"
                        value={soDT}
                      />
                    </div>
                    {state.errors.soDT && (
                      <span className="text-danger">{state.errors.soDT}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-briefcase" />
                        </span>
                      </div>
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Mã nhóm"
                        name="maNhom"
                        onChange={handleChange}
                        title="(*) Mã nhóm"
                        value={maNhom}
                      />
                    </div>
                    {state.errors.maNhom && (
                      <span className="text-danger">{state.errors.maNhom}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-briefcase" />
                        </span>
                      </div>
                      <select
                        name="maLoaiNguoiDung"
                        required
                        className="form-control"
                        onChange={handleChange}
                        title="(*) Loại người dùng"
                        value={maLoaiNguoiDung}
                      >
                        <option>Chọn loại người dùng</option>
                        <option value="QuanTri">Quản trị</option>
                        <option value="KhachHang">Khách hàng</option>
                      </select>
                    </div>
                    {state.errors.maLoaiNguoiDung && (
                      <span className="text-danger">
                        {state.errors.maLoaiNguoiDung}
                      </span>
                    )}
                  </div>
                  <div className="modal-footer" id="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={!formRef.current?.checkValidity()}
                    >
                      Thêm
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() =>
                        setState({
                          values: DEFAULT_VALUES,
                          errors: DEFAULT_ERRROS,
                        })
                      }
                    >
                      Reset
                    </button>
                    <button
                      id="closeModal"
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                    >
                      Đóng
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
