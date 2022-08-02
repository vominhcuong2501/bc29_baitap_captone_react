import React, { useEffect, useState } from "react";
import { fetchMovieListApi } from "../../services/movie";
import { useNavigate } from "react-router-dom";
import "./movie-list.scss";
import { Button } from "antd";

// module xử lý chức năng
export default function MovieList() {
  const navigate = useNavigate();

  let [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = async () => {
    const result = await fetchMovieListApi();
    setMovieList(result.data.content);
  };

  const renderMovieList = () => {
    return movieList.map((ele, index) => {
      return (
        <div className="col-3 film-item" key={ele.maPhim}>
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

  return (
    <div className="container mt-5">
      <div className="row">{renderMovieList()}</div>
    </div>
  );
}
