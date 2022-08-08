import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDeleteMovieApi, fetchMovieListApi } from "../../services/movie";
import { useAsync } from "../../hooks/useAsync";
import { fetchAddShowTimeApi } from "../../services/booking";

let DEFAULT_VALUES = {
  tenPhim: "",
  moTa: "",
  trailer: "",
  ngayKhoiChieu: "",
  dangChieu: "Đang chiếu",
  sapChieu: "Sắp chiếu",
  doHot: "Hot",
  danhGiaSao: "Đánh giá sao",
  linkHinhAnh: "",
};

let DEFAULT_ERRROS = {
  tenPhim: "",
  moTa: "",
  trailer: "",
  dangChieu: "Đang chiếu",
  sapChieu: "Sắp chiếu",
  doHot: "Hot",
  danhGiaSao: "Đánh giá sao",
  linkHinhAnh: "",
};



export default function MovieManagement() {


  // cuyển trang
  const navigate = useNavigate();

  // đặt state add movie
  const [state, setState] = useState({
    values: DEFAULT_VALUES,
    errors: DEFAULT_ERRROS,
  });

  // check validate
  const formRef = useRef();

  // cách 1:
  // // đặt state render
  // const [filmList, setFilmList] = useState([]);

  // // gọi hàm chạy lần đầu lấy dữ liệu để render
  // useEffect(() => {
  //   fetchFilmList();
  // }, []);

  // // call api lấy danh sách
  // const fetchFilmList = async () => {
  //   const result = await fetchMovieListApi();
  //   setFilmList(result.data.content);
  // };

  // cách 2: dùng useAsync tự tạo, để lấy danh sách film về
  const { state: filmList = [] } = useAsync({
    dependencies: [],
    service: () => fetchMovieListApi(),
  });

  // delete movie
  const fetchDeleteMovie = async (maPhim) => {
    await fetchDeleteMovieApi(maPhim);
    alert("Bạn đã xóa thành công!!");
    navigate("/admin/movie-management");
  };

  // render dữ liệu
  const renderContent = () => {
    return filmList?.map((ele) => {
      return (
        <tr key={ele.maPhim}>
          <td>{ele.maPhim}</td>
          <td>
            <img src={ele.hinhAnh} alt={ele.hinhAnh} height={50} width={100} />
          </td>
          <td>{ele.tenPhim}</td>
          <td>
            <button className="btn btn-warning">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              className="btn btn-danger mx-2"
              onClick={() => fetchDeleteMovie(ele.maPhim)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
            <button
              className="btn btn-success"
              onClick={() => navigate(`/admin/movie-management/show-time/${ele.maPhim}`)}
            >
              <i className="fa-solid fa-calendar"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  // nhập dữ liệu add movie
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


  // submit thêm film
  const handleSubmit = (event) => {
    event.preventDefault();
    // check validate
    if (!event.target.checkValidity()) {
      return;
    }
  };

  return (
    <div className="container-fluid">
      <div className="bg-light px-5 py-3 " style={{ borderRadius: "20px" }}>
        <h2 style={{ color: "#007bff" }}>Quản lý phim</h2>
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
              data-target="#myModal"
            >
              Thêm phim
            </button>
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr style={{ color: "#007bff", fontSize: 20 }}>
              <th>Mã phim</th>
              <th>Hình ảnh</th>
              <th>Tên phim</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>{renderContent()}</tbody>
        </table>

        {/* THÊM PHIM */}
        <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="modal-title">
                  Thêm phim
                </h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form
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
                      <input
                        type="text"
                        name="tenPhim"
                        className="form-control input-sm"
                        placeholder="Tên phim"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-bars"></i>
                        </span>
                      </div>
                      <input
                        name="moTa"
                        type="text"
                        className="form-control input-sm"
                        placeholder="Mô tả"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-trailer"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="trailer"
                        className="form-control input-sm"
                        placeholder="Trailer"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-calendar"></i>
                        </span>
                      </div>
                      <input
                        type="date"
                        name="ngayKhoiChieu"
                        className="form-control "
                        placeholder="Ngày khởi chiếu"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-eye"></i>
                        </span>
                      </div>
                      <select
                        className="form-control"
                        name="dangChieu"
                        required
                        onChange={handleChange}
                      >
                        <option>Đang chiếu</option>
                        <option>Bật</option>
                        <option>Tắt</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-question"></i>
                        </span>
                      </div>
                      <select
                        className="form-control"
                        name="sapChieu"
                        required
                        onChange={handleChange}
                      >
                        <option>Sắp chiếu</option>
                        <option>Bật</option>
                        <option>Tắt</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-pepper-hot"></i>
                        </span>
                      </div>
                      <select
                        className="form-control"
                        name="doHot"
                        required
                        onChange={handleChange}
                      >
                        <option>Hot</option>
                        <option>Bật</option>
                        <option>Tắt</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-star"></i>
                        </span>
                      </div>
                      <select
                        className="form-control"
                        name="danhGiaSao"
                        required
                        onChange={handleChange}
                      >
                        <option>Đánh giá sao</option>
                        <option>1 sao</option>
                        <option>2 sao</option>
                        <option>3 sao</option>
                        <option>4 sao</option>
                        <option>5 sao</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-link"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control input-sm"
                        placeholder="Link hình ảnh"
                        required
                        onChange={handleChange}
                        name="linkHinhAnh"
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={!formRef.current?.checkValidity()}
                    >
                      Thêm
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning mx-2"
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
