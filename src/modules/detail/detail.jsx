import React, { useEffect, useState } from "react";
import { fetchMovieDetailApi } from "../../services/movie";
import { useParams } from "react-router-dom";
import { format } from "../../utils/common";
import { useAsync } from "../../hooks/useAsync";

export default function Detail() {
  // dùng để lấy địa chỉ url
  const params = useParams();

  // cách 1:
  // // đặt state
  // let [movieDetail, setMovieDetail] = useState([]);

  // // gọi hàm khi khởi động trang
  // useEffect(() => {
  //   fetchMovieDetail();
  // }, []);

  // // call api
  // const fetchMovieDetail = async () => {
  //   // params là một object cần chấm tới movieId đặt tên giống với tên path trong router
  //   const result = await fetchMovieDetailApi(params.movieId);
  //   setMovieDetail(result.data.content);
  // };

  // cách 2: dùng useAsync tự tạo, lấy thông tin film về
  const { state : movieDetail = []} = useAsync({
    dependencies: [] ,
    service: () => fetchMovieDetailApi(params.movieId)
  })

  const styleButtonTrailer = {
    textDecoration: "none",
    fontSize: "20px",
    color: "black",
  };

  return (
    <div className="row text-light">
      <div className="col-12 col-md-6 col-lg-4">
        <img
          className="img-fluid"
          src={movieDetail.hinhAnh}
          style={{ height: "250px", objectFit: "cover" }}
        />
      </div>
      <div className="col-12 col-md-6 col-lg-8">
        <h3 className="text-warning">{movieDetail.tenPhim}</h3>
        <p className="text-light">{movieDetail.moTa}</p>
        <p>Ngày khởi chiếu: {format(movieDetail.ngayKhoiChieu)}</p>
        <div>
          <button className="btn btn-info mr-2">
            <a
              style={styleButtonTrailer}
              href={movieDetail.trailer}
              target="_blank"
            >
              Trailer
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
