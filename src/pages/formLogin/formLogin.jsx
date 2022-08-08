import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { USER_INFO_KEY } from "../../constans/common";
import { loginApi } from "../../services/user";
import { setUserAction } from "../../store/actions/user.action";

export default function FormLogin() {
  // gửi dữ liệu
  const dispatch = useDispatch();

  // chuyển trang
  const navigate = useNavigate();

  // dùng để lấy event.target trong form
  const formRef = useRef();

  // đặt state
  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  // setState khi nhập dữ liệu
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  // submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await loginApi(state);

      // 1. lưu local store
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(result.data.content));

      // 2. gửi thông tin lên reducer
      dispatch(setUserAction(result.data.content));

      // 3. đăng nhập thành công chuyển page
      navigate("/");
    } catch (errors) {
      alert(errors.response.data.content);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="w-25 col-md-6 col-12 mx-auto mt-5">
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
                  <div className=" col-12 form-group my-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-user"></i>
                        </span>
                      </div>
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Tài khoản"
                        onChange={handleChange}
                        name="taiKhoan"
                      />
                    </div>
                  </div>
                  <div className="form-group col-12 my-3">
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
      </div>
    </div>
  );
}
