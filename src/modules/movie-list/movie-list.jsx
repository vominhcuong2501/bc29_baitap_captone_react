import React, { useEffect, useState } from "react";
import { fetchMovieListApi } from "../../services/movie";
import { useNavigate } from "react-router-dom";
import "./movie-list.scss";

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
    return movieList.map((ele) => {
      return (
        <div className="col-3 film-item" key={ele.maPhim}>
          <div className="card movie-card" style={{ marginBottom: 20 }}>
            <img
              style={{ height: "100%", height: "350px" }}
              className="card-img-top"
              src={ele.hinhAnh}
              alt="movie"
            />
            <div className="overlay">
              <div className="card-body film-text">
                <h5 className="card-title">{ele.tenPhim}</h5>
                <button
                  onClick={() => navigate(`/movie/${ele.maPhim}`)}
                  className="btn btn-info"
                >
                  XEM CHI TIẾT
                </button>
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
