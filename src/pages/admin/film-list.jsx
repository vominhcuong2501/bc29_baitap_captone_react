import React, { useEffect, useState } from "react";
import { fetchMovieListApi } from "../../services/movie";

export default function FilmList() {
  const [filmList, setFilmList] = useState([]);
  useEffect(() => {
    fetchFilmList();
  }, []);
  const fetchFilmList = async () => {
    const result = await fetchMovieListApi();
    setFilmList(result.data.content);
    console.log(result.data.content);
  };

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
    <div className="bg-light px-5 py-3" style={{ borderRadius: "20px" }}>
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
              <form role="form">
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
                    <select className="form-control" name="dangChieu">
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
                    <select className="form-control" name="sapChieu">
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
                    <select className="form-control" name="hot">
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
                    <select className="form-control" name="hot">
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
                    />
                  </div>
                </div>           
              </form>
            </div>
            <div className="modal-footer" id="modal-footer">
              <button  type="button" className="btn btn-success">
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
