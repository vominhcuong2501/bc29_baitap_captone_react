import React, { useRef, useState } from "react";

let DEFAULT_VALUES = {
  taiKhoan: "",
  matKhau: "",
  hoTen: "",
  email: "",
};
let DEFAULT_ERRROS = {
  taiKhoan: "",
  matKhau: "",
  hoTen: "",
  email: "",
};

export default function FormRegister() {
  const formRef = useRef();

  const [state, setState] = useState({
    values: DEFAULT_VALUES,
    errors: DEFAULT_ERRROS,
  });
  const [valid, setValid] = useState({ valid: true });

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
    if (formRef.current?.checkValidity()) {
      setValid({
        valid: false,
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      return;
    }
    setState({
      values: DEFAULT_VALUES,
      errors: DEFAULT_ERRROS,
    });
    setValid({
      valid: true,
    });
  };
  return (
    <div className="w-25 mx-auto mt-5">
      <div className="card p-0">
        <div
          className="card-header bg-warning text-white font-weight-bold text-center"
          style={{ fontSize: "25px" }}
        >
          ĐĂNG KÝ
        </div>
        <div className="card-body">
          <form ref={formRef} noValidate onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>Họ tên</label>
                  <input
                    required
                    name="hoTen"
                    type="text"
                    className="form-control"
                    title="Họ tên"
                    onChange={handleChange}
                  />
                  {state.errors.hoTen && (
                    <span className="text-danger">{state.errors.hoTen}</span>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    required
                    name="email"
                    type="text"
                    className="form-control"
                    title="Email"
                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                    onChange={handleChange}
                  />
                  {state.errors.email && (
                    <span className="text-danger">{state.errors.email}</span>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label>Tài khoản</label>
                  <input
                    required
                    name="taiKhoan"
                    type="text"
                    className="form-control"
                    title="Tài khoản"
                    onChange={handleChange}
                  />
                  {state.errors.taiKhoan && (
                    <span className="text-danger">{state.errors.taiKhoan}</span>
                  )}
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
                    title="Mật khẩu"
                    onChange={handleChange}
                  />
                  {state.errors.matKhau && (
                    <span className="text-danger">{state.errors.matKhau}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <button
                disabled={valid.valid}
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
  );
}
