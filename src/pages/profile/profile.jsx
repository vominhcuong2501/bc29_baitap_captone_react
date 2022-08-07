import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchEditUserApi, fetchInfomationApi } from "../../services/user";
import { useSelector } from "react-redux";
import moment from "moment";

export default function FormProfile(props) {
  // chuyển trang
  const navigate = useNavigate();

  // đặt form dể lấy được event.target trong form
  const formRef = useRef();

  // đặt state
  const [state, setState] = useState({
    values: {
      taiKhoan: "",
      matKhau: "",
      soDT: "",
      email: "",
      maNhom: "",
      hoTen: "",
    },
    errors: {
      taiKhoan: "",
      matKhau: "",
      soDT: "",
      email: "",
      maNhom: "",
      hoTen: "",
    },
  });

  // lấy thông tin từ reducer
  const { userInfo } = useSelector((state) => state.userReducer);

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

  // đặt state
  const [infoUser, setInfoUser] = useState();

  // gọi hàm lấy thông tin tài khoản
  useEffect(() => {
    fetchInfomation();
  }, []);

  // call api lấy thông tin tài khoản
  const fetchInfomation = async () => {
    const result = await fetchInfomationApi(userInfo.taiKhoan);
    setInfoUser(result.data.content);
    console.log(result.data.content);
  };

  // gọi hàm gửi thông tin tài khoản đã cập nhật
  useEffect(() => {
    if (infoUser) {
      setState((state) => ({
        ...state,
        values: infoUser,
      }));
    }
  }, [infoUser]);

  // submit cập nhật thông tin
  const handleSubmit = async (event) => {
    // ngăn load lại trang
    event.preventDefault();
    if (!event.target.checkValidity()) {
      return;
    }
    try {
      await fetchEditUserApi(state.values);
      alert("Cập nhật thành công");
      navigate("/profile");
    } catch (errors) {
      alert(errors.response.data.content);
    }
  };

  const styleBgProfile = {
    backgroundImage: `url(./../profile3.jpg)`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  };

  const { taiKhoan, hoTen, email, maNhom, soDT, matKhau } = state.values;

  return (
    <div className="container-fluid" style={styleBgProfile}>
      <div className="row">
        <div className="col-12 col-lg-4 p-5">
          <div className="card p-0">
            <div
              className="card-header bg-warning text-light font-weight-bold text-center"
              style={{ fontSize: "25px" }}
            >
              Thông tin tài khoản
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
                      value={taiKhoan}
                    />
                  </div>
                  {state.errors.taiKhoan && (
                    <span className="text-danger">{state.errors.taiKhoan}</span>
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
                    <span className="text-danger">{state.errors.matKhau}</span>
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
                <div className="text-right">
                  <button
                    disabled={!formRef.current?.checkValidity()}
                    type="submit"
                    className="btn btn-warning mr-2"
                  >
                    Cập nhật
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8 p-5">
          <div
            className="card-header bg-warning text-light font-weight-bold text-center"
            style={{ fontSize: "25px" }}
          >
            Lịch sử đặt vé
          </div>
          {infoUser?.thongTinDatVe.map((ele) => {
            return (
              <div className="card" key={ele.maVe}>
                <div className="row mt-2">
                  <div className="col-3">
                    <img
                      src={ele.hinhAnh}
                      alt={ele.hinhAnh}
                      width={200}
                      height={250}
                      className="ml-3"
                    />
                  </div>
                  <div className="col-9 card-body p-0">
                    <h2 className="card-title" style={{ fontWeight: "bold" }}>
                      Tên phim:{" "}
                      <span className=" text-warning">{ele.tenPhim}</span>
                    </h2>
                    <p className="card-text m-0">
                      Ngày đặt:{" "}
                      <span className="text-primary">
                        {moment(ele.ngayDat).format("LLL")}
                      </span>
                    </p>
                    <p className="card-text m-0">
                      Giá vé:{" "}
                      <span className="text-primary">
                        {ele.giaVe.toLocaleString()} VNĐ
                      </span>
                    </p>
                    <p className="card-text m-0">
                      Thời lượng:{" "}
                      <span className="text-primary">
                        {ele.thoiLuongPhim} phút
                      </span>
                    </p>
                    <p className="card-text m-0">
                      {ele.danhSachGhe.map((ele, index) => {
                        return (
                          <div key={index}>
                            Địa chỉ:{" "}
                            <span className="text-primary">
                              {ele.tenHeThongRap}
                            </span>{" "}
                            - <span className="text-primary">{ele.tenRap}</span>{" "}
                            - Số ghế:{" "}
                            <span className="text-primary">{ele.tenGhe}</span>
                          </div>
                        );
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
