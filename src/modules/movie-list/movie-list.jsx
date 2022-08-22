import React, { useContext, useEffect, useState } from "react";
import { fetchMovieListApi } from "../../services/movie";
import { useNavigate } from "react-router-dom";
import "./movie-list.scss";
import { Button } from "antd";
import { Carousel } from "antd";
// import { LoadingContext } from "../../contexts/loading.context";
import { useAsync } from "../../hooks/useAsync";

// module xử lý chức năng
export default function MovieList() {
  // chuyển trang
  const navigate = useNavigate();

  // cách 1:
  // // đặt state từ useContext
  // const [loadingState, setLoadingState] = useContext(LoadingContext);

  // // đặt state
  // let [movieList, setMovieList] = useState([]);

  // // goi hàm khi khởi động trang
  // useEffect(() => {
  //   fetchMovieList();
  // }, []);

  // // call api
  // const fetchMovieList = async () => {
  //   setLoadingState({ isLoading: true });
  //   const result = await fetchMovieListApi();
  //   setLoadingState({ isLoading: false });
  //   setMovieList(result.data.content);
  // };

  // cách 2: dùng useAsync tự tạo, lấy danh sách film
  const { state: movieList = [] } = useAsync({
    dependencies: [],
    service: () => fetchMovieListApi(),
  });

  // render dữ liệu
  const renderMovieList = () => {
    return movieList.map((ele) => {
      return (
        <div className="film-item px-3" key={ele.maPhim}>
          <div
            className="card movie-card mx-3"
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
  const styleTitle = {
    backgroundColor: "white",
    background:
      "linear-gradient(to right,#673ab7 0,#e91e63 36%,#e91e63 65%,#673ab7 100%)",
    fontWeight: "700",
    color: "white",
    animation: "development 6s infinite linear",
    fontSize: "50px",
  };

  return (
    <div style={styleBgMovieList}>
      <div className="container py-5" id="carouselId">
        <h2 className="text-center p-3 mb-5" style={styleTitle}>
          Danh sách phim
        </h2>
        <Carousel
          autoplay
          slidesToShow={4}
          slidesToScroll={1}
          arrows
          dots={false}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {renderMovieList()}
        </Carousel>
      </div>
    </div>
  );
}
