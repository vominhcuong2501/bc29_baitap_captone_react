import { notification } from "antd";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../services/user";

let DEFAULT_VALUES = {
  taiKhoan: "",
  hoTen: "",
  email: "",
  matKhau: "",
  soDT: "",
  maNhom: "",
};
let DEFAULT_ERRROS = {
  taiKhoan: "",
  hoTen: "",
  email: "",
  matKhau: "",
  soDT: "",
  maNhom: "",
};

export default function FormRegister() {
  // chuyển trang
  const navigate = useNavigate();

  //đặt form dể lấy được event.target trong form
  const formRef = useRef();

  // đặt state
  const [state, setState] = useState({
    values: DEFAULT_VALUES,
    errors: DEFAULT_ERRROS,
  });

  // setState khi nhập dữ liệu
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

  // submit
  const handleSubmit = async (event) => {
    // ngăn load lại trang
    event.preventDefault();
    if (!event.target.checkValidity()) {
      return;
    }

    try {
      await registerApi(state.values);
      alert("Bạn đã đăng ký thành công !!!");
      navigate("/login");
    } catch (errors) {
      notification.error({
        message: errors.response.data.content,
      });
    }
  };

  const styleBg = {
    backgroundImage: `url(./../hinhnen.jpg)`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  };

  return (
    <div style={styleBg}>
      <div className="container pb-5">
        <div className="row ">
          <div className="w-25 col-md-6 col-12 mx-auto mt-5">
            <div className="card p-0">
              <div
                className="card-header bg-warning text-white font-weight-bold text-center"
                style={{ fontSize: "25px" }}
              >
                ĐĂNG KÝ
              </div>
              <div className="card-body">
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
                        pattern='^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'
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
                        type="password"
                        className="form-control"
                        placeholder="Mật khẩu (Ex: Miku@123)"
                        name="matKhau"
                        onChange={handleChange}
                        title="(*) Mật khẩu"
                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$"
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
                        pattern="^[0-9]+$"
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
                      <select  required
                        className="form-control"
                        name="maNhom"
                        onChange={handleChange}
                        title="(*) Mã nhóm">
                          <option value="0">Vui lòng chọn mã nhóm</option>
                          <option value="GP01">GP01</option>
                          <option value="GP02">GP02</option>
                          <option value="GP03">GP03</option>
                          <option value="GP04">GP04</option>
                          <option value="GP05">GP05</option>
                          <option value="GP06">GP06</option>
                          <option value="GP07">GP07</option>
                          <option value="GP08">GP08</option>
                          <option value="GP09">GP09</option>
                          <option value="GP10">GP10</option>
                        </select>
                      {/* <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Mã nhóm"
                        name="maNhom"
                        onChange={handleChange}
                        title="(*) Mã nhóm"
                      /> */}
                    </div>
                    {state.errors.maNhom && (
                      <span className="text-danger">{state.errors.maNhom}</span>
                    )}
                  </div>
                  <p>
                    Nếu bạn đã có tài khoản vui lòng nhấn{" "}
                    <Link style={{ border: "none", color: "blue" }} to="/login">
                      đăng nhập
                    </Link>
                  </p>
                  <div className="text-right">
                    <button
                      disabled={!formRef.current?.checkValidity()}
                      type="submit"
                      className="btn btn-warning mr-2"
                    >
                      Đăng ký
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
