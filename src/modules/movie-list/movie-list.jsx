import React, { useEffect, useState } from "react";
import { fetchMovieListApi } from "../../services/movie";
import { useNavigate } from "react-router-dom";
import "./movie-list.scss";
import { Button } from "antd";

// module xử lý chức năng
export default function MovieList() {
  // chuyển trang
  const navigate = useNavigate();

  // đặt state
  let [movieList, setMovieList] = useState([]);

  // goi hàm khi khởi động trang
  useEffect(() => {
    fetchMovieList();
  }, []);

  // call api
  const fetchMovieList = async () => {
    const result = await fetchMovieListApi();
    setMovieList(result.data.content);
  };

  // render dữ liệu
  const renderMovieList = () => {
    return movieList.map((ele, index) => {
      return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 film-item" key={ele.maPhim}>
          <div
            className="card movie-card"
            style={{ marginBottom: 20, overflow: "hidden" }}
          >
            <img
              style={{ height: "350px", objectFit: "cover" }}
              className="card-img-top"
              src={ele.hinhAnh}
              alt="movie"
            />
            <div className="overlay">
              <div className="card-body film-text">
                <h5
                  className="card-title text-dark"
                  style={{ fontWeight: "bold" }}
                >
                  {ele.tenPhim}
                </h5>
                <Button
                  type="primary"
                  onClick={() => navigate(`/movie/${ele.maPhim}`)}
                >
                  XEM CHI TIẾT
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const styleBg1 = {
    backgroundImage: `url(./hinhnen.jpg)`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  };
  return (
    <div style={styleBg1}>
      <div className="container py-5">
        <div className="row">{renderMovieList()}</div>
      </div>
    </div>
  );
}
