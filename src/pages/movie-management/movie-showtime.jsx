import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchDeleteMovieApi,
  fetchMovieDetailApi,
  fetchMovieListApi,
} from "../../services/movie";
import { useAsync } from "../../hooks/useAsync";
import {
  fetchHeThongRapApi,
  fetchMovieShowTimesApi,
} from "../../services/cinema";

let DEFAULT_VALUES = {
  maHeThongRap: "",
  giaVe: 0,
  ngayChieuGioChieu: "",
  maRap: "",
};

let DEFAULT_ERRROS = {
    maHeThongRap: "",
  giaVe: 0,
  ngayChieuGioChieu: "",
  maRap: "",
};

export default function MovieShowtime() {
  // lấy url
  const params = useParams();

  // cuyển trang
  const navigate = useNavigate();

  // đặt state show-time
  const [state, setState] = useState({
    values: DEFAULT_VALUES,
    errors: DEFAULT_ERRROS,
  });

  const [heThongRap, setHethongRap] = useState();

  // check validate
  const formRef = useRef();

  // cách 2: dùng useAsync tự tạo, lấy thông tin film về
  const { state: movieShowTimes = [] } = useAsync({
    dependencies: [],
    service: () => fetchMovieShowTimesApi(params.movieId),
  });

  // nhập dữ liệu show-time
  const handleChange = async (event) => {
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
    console.log(state.values);

  };

  // submit thêm show-time
  const handleSubmit = async (event) => {
    event.preventDefault();
    // check validate
    if (!event.target.checkValidity()) {
      return;
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="modal-header">
        <h4 className="modal-title" id="modal-title">
          Tạo lịch chiếu
        </h4>
      </div>
      <div className="modal-body row">
        <div className="col-4">
          <img src={movieShowTimes?.hinhAnh} alt={movieShowTimes?.maPhim} />
        </div>
        <div className="col-8 ">
          <form
            className="w-50"
            role="form"
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa-solid fa-clapperboard"></i>
                  </span>
                </div>
                <select
                  className="form-control"
                  name="maHeThongRap"
                  required
                  onChange={handleChange}
                >
                  <option>Chọn hệ thống rạp</option>
                  <option>CGV</option>
                  <option>LotteCinema</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa-solid fa-film"></i>
                  </span>
                </div>
                <select
                  className="form-control"
                  name="cumRap"
                  required
                  onChange={handleChange}
                >
                  <option>Chọn cụm rạp</option>
                  {movieShowTimes?.heThongRapChieu?.map((ele) => {
                    return ele.cumRapChieu.map((ele) => {
                      return (
                        <option id={ele.maHeThongRap} key={ele.maCumRap}>
                          {ele.tenCumRap}
                        </option>
                      );
                    });
                  })}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa-solid fa-calendar-days"></i>
                  </span>
                </div>
                <input
                  name="ngayChieuGioChieu"
                  type="date"
                  className="form-control input-sm"
                  placeholder="Ngày chiếu giờ chiếu"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa-solid fa-money-bill"></i>
                  </span>
                </div>
                <input
                  name="giaVe"
                  type="number"
                  className="form-control input-sm"
                  placeholder="Giá vé"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="btn btn-success"
                disabled={!formRef.current?.checkValidity()}
              >
                Tạo lịch chiếu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
