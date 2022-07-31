import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { loginApi } from "../../services/user";

export default function FormLogin() {
  const formRef = useRef();

  const [state, setState] = useState({
    taiKhoan: '',
    matKhau: ''
  });

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setState({
      ...state,
      [name] : value
    });
    
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await loginApi(state)
    console.log(result.data.content);

    // lưu local store
    localStorage.setItem("USER_LOGIN_KEY", JSON.stringify(result.data.content))
  };
  return (
    <div className="w-25 mx-auto mt-5">
      <div className="card p-0">
        <div
          className="card-header bg-warning text-white font-weight-bold text-center"
          style={{ fontSize: "25px" }}
        >
          ĐĂNG NHẬP
        </div>
        <div className="card-body">
          <form ref={formRef} noValidate onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>Tài khoản</label>
                  <input
                    required
                    name="taiKhoan"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                  />
                 
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label>Mật khẩu</label>
                  <input
                    required
                    name="matKhau"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                  />
                 
                </div>
              </div>
            </div>
            <p>
              Nếu bạn chưa có tài khoản vui lòng nhấn{" "}
              <Link
                style={{ border: "none", color: "blue" }}
                to="/register"
              >
                đăng ký
              </Link>
            </p>
            <div className="text-right">
              <button type="submit" className="btn btn-warning mr-2">
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
