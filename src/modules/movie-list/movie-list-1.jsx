import React, { useContext, useEffect, useState } from "react";
import { fetchMovieListApi } from "../../services/movie";
import { useNavigate } from "react-router-dom";
import "./movie-list.scss";
import { Button } from "antd";
import { Carousel } from "antd";
import { useAsync } from "../../hooks/useAsync";

// module xử lý chức năng
export default function MovieList1() {
  // chuyển trang
  const navigate = useNavigate();

  // cách 2: dùng useAsync tự tạo, lấy danh sách film
  const { state: movieList = [] } = useAsync({
    dependencies: [],
    service: () => fetchMovieListApi(),
  });

  // render dữ liệu
  const renderMovieList = () => {
    return movieList.map((ele) => {
      return (
        <div
          className="col-lg-3 col-md-4 col-12 film-item px-3"
          key={ele.maPhim}
        >
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
                  className="card-title text-danger"
                  style={{ fontWeight: "bold", fontSize: "20px" }}
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

  const styleBgMovieList = {
    backgroundImage: `url(./lichChieu1.jpg)`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  };

  return (
    <div style={styleBgMovieList}>
      <div
        style={{
          textAlign: "center",
          background:
            "linear-gradient(to right,#673ab7 0,#e91e63 36%,#e91e63 65%,#673ab7 100%)",
          animation: "development 6s infinite linear",
        }}
      >
        <h2
          className="text-center text-light mt-3 p-3 display-4"
          style={{
            
          }}
        >MOVIE SELECTION</h2>
      </div>

      <div className="container" style={{ paddingTop: "50px" }}>
        <div className="row">{renderMovieList()}</div>
      </div>
    </div>
  );
}
